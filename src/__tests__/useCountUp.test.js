'use strict';

import React from 'react';
import { render, act } from '@testing-library/react';
import { cleanup } from '@testing-library/react-hooks';
import { useCountUp } from '../index';

afterEach(cleanup);

const checkContent = async (container, expectedValue, timeout = 1100) => {
  await act(() => {
    return new Promise((res) => {
      setTimeout(() => {
        const span = container.firstChild;
        expect(span.textContent).toEqual(expectedValue);
        res();
      }, timeout);
    });
  });
};

describe('useCountUp', () => {
  it('renders countup correctly with ref', async () => {
    const Hook = () => {
      const span = React.useRef(null);
      useCountUp({ end: 10, ref: span });
      return <span ref={span} />;
    };

    const { container } = render(<Hook />);

    await checkContent(container, '10');
  });

  it('renders countup correctly with element id', async () => {
    const Hook = () => {
      useCountUp({ end: 10, ref: 'counter' });
      return <span id="counter" />;
    };

    const { container } = render(<Hook />);

    await checkContent(container, '10');
  });

  it('does not start countup when startOnMount is false', async () => {
    const Hook = () => {
      useCountUp({ end: 10, startOnMount: false, ref: 'counter' });
      return <span id="counter" />;
    };

    const { container } = render(<Hook />);

    await checkContent(container, '');
  });

  it('renders with delay correctly', async () => {
    const Hook = () => {
      useCountUp({ delay: 1, duration: 1, end: 10, ref: 'counter' });
      return <span id="counter" />;
    };

    const { container } = render(<Hook />);

    await checkContent(container, '', 900);
    await checkContent(container, '10');
  });

  it('calls onStart correctly', async () => {
    let startFn;
    const onStart = jest.fn();
    const Hook = () => {
      const { start } = useCountUp({
        end: 10,
        onStart,
        startOnMount: false,
        ref: 'counter',
      });
      startFn = start;
      return <span id="counter" />;
    };

    const { container } = render(<Hook />);
    act(() => {
      startFn();
    });
    expect(onStart).toHaveBeenCalled();

    await checkContent(container, '10');
  });

  it('calls onReset correctly', async () => {
    let resetFn;
    const onReset = jest.fn();
    const Hook = () => {
      const { reset } = useCountUp({ end: 10, onReset, ref: 'counter' });
      resetFn = reset;
      return <span id="counter" />;
    };

    const { container } = render(<Hook />);

    const span = container.firstChild;

    await checkContent(container, '10');

    act(() => {
      resetFn();
    });
    expect(onReset).toHaveBeenCalled();
    expect(span.textContent).toEqual('0');
  });

  it('calls onEnd correctly', async () => {
    let startFn;
    const onEnd = jest.fn();
    const Hook = () => {
      const { start } = useCountUp({
        end: 10,
        duration: 1,
        onEnd,
        startOnMount: false,
        ref: 'counter',
      });
      startFn = start;
      return <span id="counter" />;
    };

    const { container } = render(<Hook />);
    act(() => {
      startFn();
    });

    await checkContent(container, '10');
    expect(onEnd).toHaveBeenCalled();
  });

  it('calls update correctly', async () => {
    let updateFn;
    const onUpdate = jest.fn();

    const Hook = () => {
      const { update } = useCountUp({
        duration: 1,
        end: 10,
        onUpdate,
        ref: 'counter',
      });
      updateFn = update;
      return <span id="counter" />;
    };

    const { container } = render(<Hook />);

    await checkContent(container, '10');

    act(() => {
      updateFn(20);
    });
    expect(onUpdate).toHaveBeenCalled();
    await checkContent(container, '20');
  });

  it('calls onPauseResume correctly', async () => {
    let pauseResumeFn;
    const onPauseResume = jest.fn();

    const Hook = () => {
      const { pauseResume } = useCountUp({
        duration: 1,
        end: 10,
        onPauseResume,
        ref: 'counter',
      });
      pauseResumeFn = pauseResume;
      return <span id="counter" />;
    };

    const { container } = render(<Hook />);
    const span = container.firstChild;

    await act(() => {
      return new Promise((res) => {
        setTimeout(() => {
          pauseResumeFn();
          expect(onPauseResume).toHaveBeenCalled();
          res();
        }, 400);
      });
    });

    await act(() => {
      return new Promise((res) => {
        setTimeout(() => {
          expect(span.textContent).not.toEqual('10');
          res();
        }, 1100);
      });
    });

    act(() => {
      pauseResumeFn();
    });

    await checkContent(container, '10');
  });

  it('re-renders for new props', async () => {
    // eslint-disable-next-line react/prop-types
    const Hook = ({ suffix = '', prefix = '', separator = '', end = 10 }) => {
      const div = React.useRef();
      useCountUp({ end, suffix, prefix, separator, ref: div });
      return <div ref={div} />;
    };

    const { container, rerender } = render(<Hook />);
    rerender(<Hook suffix=" sec" />);

    await checkContent(container, '10 sec');

    rerender(<Hook prefix="$" />);

    await checkContent(container, '$10');

    rerender(<Hook separator="," end={1000} />);

    await checkContent(container, '1,000');
  });
});
