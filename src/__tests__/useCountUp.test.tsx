'use strict';

import React from 'react';
import { fireEvent, render, act } from '@testing-library/react';
import { cleanup } from '@testing-library/react-hooks';
import { useCountUp } from '../index';

afterEach(cleanup);

it('renders countup correctly', async done => {
  const Hook = () => {
    const countUpRef = React.useRef(null);
    useCountUp({ end: 10, ref: countUpRef, startOnMount: true });
    return <span ref={countUpRef} />;
  };

  const { container } = render(<Hook />);

  act(() => {
    new Promise(() => {
      setTimeout(() => {
        const span = container.firstChild;
        expect(span!.textContent).toEqual('10');
        done();
      }, 1100);
    });
  });
});

it('does not start countup when startOnMount is false', async done => {
  const Hook = () => {
    const countUpRef = React.useRef(null);
    useCountUp({ end: 10, ref: countUpRef, startOnMount: false });
    return <span ref={countUpRef} />;
  };

  const { container } = render(<Hook />);

  act(() => {
    new Promise(() => {
      setTimeout(() => {
        const span = container.firstChild;
        expect(span!.textContent).toEqual('');
        done();
      }, 1100);
    });
  });
});

it('renders with delay correctly with hook', async done => {
  const Hook = () => {
    const countUpRef = React.useRef(null);
    useCountUp({ end: 10, ref: countUpRef, startOnMount: true, delay: 1 });
    return <span ref={countUpRef} />;
  };

  const { container } = render(<Hook />);

  act(() => {
    new Promise(() => {
      setTimeout(() => {
        const span = container.firstChild;
        expect(span!.textContent).not.toEqual('10');
      }, 1100);
    });
  });

  act(() => {
    new Promise(() => {
      setTimeout(() => {
        const span = container.firstChild;
        expect(span!.textContent).toEqual('10');
        done();
      }, 2100);
    });
  });
});

type Function = () => void;

interface Spy {
  start?: Function;
  pauseResume?: Function;
  update?: Function;
  reset?: Function;
}

const mockFn = () => {};

const spy: Spy = {
  start: mockFn,
  pauseResume: mockFn,
  update: mockFn,
};

it('calls start correctly with hook', () => {
  const Hook = () => {
    const countUpRef = React.useRef(null);
    const { start } = useCountUp({
      end: 10,
      ref: countUpRef,
      startOnMount: true,
    });
    spy.start = start;
    spyOn(spy, 'start');
    return (
      <>
        <div onClick={spy.start} />
        <span ref={countUpRef} />
      </>
    );
  };

  const { container } = render(<Hook />);
  const div = container.firstChild!;
  fireEvent.click(div as Element);
  expect(spy.start).toHaveBeenCalled();
});

it('calls reset correctly with hook', () => {
  const Hook = () => {
    const countUpRef = React.useRef(null);
    const { reset } = useCountUp({
      end: 10,
      ref: countUpRef,
      startOnMount: true,
    });
    spy.reset = reset;
    spyOn(spy, 'reset');
    return (
      <>
        <div onClick={spy.reset} />
        <span ref={countUpRef} />
      </>
    );
  };

  const { container } = render(<Hook />);
  fireEvent.click(container.firstChild as Element);
  expect(spy.reset).toHaveBeenCalled();
});

it('calls update correctly with hook', () => {
  const spy = {
    onUpdate: jest.fn(),
  };

  const Hook = () => {
    const countUpRef = React.useRef(null);
    const { update } = useCountUp({
      end: 10,
      ref: countUpRef,
      onUpdate: spy.onUpdate,
    });
    return (
      <>
        <div onClick={() => update()} />
        <span ref={countUpRef} />
      </>
    );
  };

  const { container } = render(<Hook />);
  fireEvent.click(container.firstChild as Element);
  expect(spy.onUpdate).toHaveBeenCalled();
});

it('calls pauseResume correctly with hook', () => {
  const spy = {
    onPauseResume: jest.fn(),
  };

  const Hook = () => {
    const countUpRef = React.useRef(null);
    const { pauseResume } = useCountUp({
      end: 10,
      ref: countUpRef,
      onPauseResume: spy.onPauseResume,
    });
    return (
      <>
        <div onClick={() => pauseResume()} />
        <span ref={countUpRef} />
      </>
    );
  };

  const { container } = render(<Hook />);
  fireEvent.click(container.firstChild as Element);
  expect(spy.onPauseResume).toHaveBeenCalled();
});

it('calls onStart and onEnd correctly with hook', async done => {
  const spy = {
    onStart: jest.fn(),
    onEnd: jest.fn(),
  };

  const Hook = () => {
    const countUpRef = React.useRef(null);
    spyOn(spy, 'onStart');
    spyOn(spy, 'onEnd');
    const { start } = useCountUp({
      ref: countUpRef,
      end: 10,
      onStart: spy.onStart,
      duration: 1,
      onEnd: spy.onEnd,
      startOnMount: false,
    });
    return (
      <>
        <div onClick={start} />
        <span ref={countUpRef} />
      </>
    );
  };

  const { container } = render(<Hook />);

  fireEvent.click(container.firstChild as Element);

  expect(spy.onStart).toHaveBeenCalled();

  act(() => {
    new Promise(() => {
      setTimeout(() => {
        expect(spy.onEnd).toHaveBeenCalled();
        done();
      }, 1100);
    });
  });
});

it('calls onEnd correctly with hook when startOnMount is true', async done => {
  const spy = {
    onEnd: jest.fn(),
  };

  const Hook = () => {
    const countUpRef = React.useRef(null);
    spyOn(spy, 'onEnd');
    const { start } = useCountUp({
      ref: countUpRef,
      end: 10,
      duration: 1,
      onEnd: spy.onEnd,
      startOnMount: true,
    });
    return (
      <>
        <div onClick={start} />
        <span ref={countUpRef} />
      </>
    );
  };

  const { container } = render(<Hook />);

  fireEvent.click(container.firstChild as Element);

  act(() => {
    new Promise(() => {
      setTimeout(() => {
        expect(spy.onEnd).toHaveBeenCalled();
        done();
      }, 1100);
    });
  });
});
