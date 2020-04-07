'use strict';

import React from 'react';
import { fireEvent, render, act } from '@testing-library/react';
import { cleanup } from '@testing-library/react-hooks';
import { useCountUp } from '../index';

afterEach(cleanup);

it('renders countup correctly', async (done) => {
  const Hook = () => {
    const span = React.useRef(null);
    useCountUp({ end: 10, ref: span });
    return <span ref={span} />;
  };

  const { container } = render(<Hook />);

  await act(() => {
    return new Promise(() => {
      setTimeout(() => {
        const span = container.firstChild;
        expect(span.textContent).toEqual('10');
        done();
      }, 1100);
    });
  });
});

it('does not start countup when startOnMount is false', async (done) => {
  const Hook = () => {
    const span = React.useRef();
    useCountUp({ end: 10, startOnMount: false, ref: span });
    return <span ref={span} />;
  };

  const { container } = render(<Hook />);

  await act(() => {
    return new Promise(() => {
      setTimeout(() => {
        const span = container.firstChild;
        expect(span.textContent).toEqual('');
        done();
      }, 1100);
    });
  });
});

it('renders with delay correctly with hook', async (done) => {
  const Hook = () => {
    const span = React.useRef();
    useCountUp({ end: 10, delay: 1, ref: span });
    return <span ref={span} />;
  };

  const { container } = render(<Hook />);

  await act(() => {
    return new Promise(() => {
      setTimeout(() => {
        const span = container.firstChild;
        expect(span.textContent).toEqual('10');
        done();
      }, 2100);
    });
  });
});

it('calls reset correctly with hook', () => {
  const spy = {};
  const Hook = () => {
    const span = React.useRef();
    const { reset } = useCountUp({ end: 10, ref: span });
    spy.reset = reset;
    spyOn(spy, 'reset');
    return <span onClick={spy.reset} ref={span} />;
  };

  const { container } = render(<Hook />);
  fireEvent.click(container.firstChild);
  expect(spy.reset).toHaveBeenCalled();
});

it('calls update correctly with hook', async (done) => {
  const spy = {};

  const Hook = () => {
    const span = React.useRef();
    const onUpdate = jest.fn();
    const { update } = useCountUp({ end: 10, onUpdate, ref: span });
    spy.onUpdate = onUpdate;
    return <span onClick={() => update(20)} ref={span} />;
  };

  const { container } = render(<Hook />);
  const span = container.firstChild;
  fireEvent.click(span);
  expect(spy.onUpdate).toHaveBeenCalled();

  await act(() => {
    return new Promise(() => {
      setTimeout(() => {
        expect(span.textContent).toEqual('20');
        done();
      }, 1100);
    });
  });
});

it('calls pauseResume correctly with hook', () => {
  const spy = {};

  const Hook = () => {
    const div = React.useRef();
    const onPauseResume = jest.fn();
    const { pauseResume } = useCountUp({ end: 10, onPauseResume, ref: div });
    spy.onPauseResume = onPauseResume;
    return <span onClick={pauseResume} ref={div} />;
  };

  const { container } = render(<Hook />);
  fireEvent.click(container.firstChild);
  expect(spy.onPauseResume).toHaveBeenCalled();
});

it('calls start correctly with hook', async (done) => {
  const spy = {};
  const onStart = jest.fn();
  const Hook = () => {
    const span = React.useRef();
    spy.onStart = onStart;
    spyOn(spy, 'onStart');
    const { start } = useCountUp({
      end: 10,
      onStart,
      startOnMount: false,
      ref: span,
    });
    return <span onClick={start} ref={span} />;
  };

  const { container } = render(<Hook />);
  const span = container.firstChild;

  expect(span.textContent).toEqual('');

  fireEvent.click(container.firstChild);

  await act(() => {
    return new Promise(() => {
      setTimeout(() => {
        expect(span.textContent).toEqual('10');
        done();
      }, 1100);
    });
  });

  expect(spy.onStart).toHaveBeenCalled();
});
