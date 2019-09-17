'use strict';

import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { useCountUp } from '../index';

jest.useFakeTimers();
afterEach(cleanup);

it('renders start value correctly with hook', () => {
  const Hook = () => {
    const { countUp } = useCountUp({ end: 10 });
    return <span>{countUp}</span>;
  };

  const { container } = render(<Hook />);
  const span = container.firstChild;
  jest.runAllTimers();
  expect(span.textContent).toEqual('0');
});

it('renders with delay correctly with hook', () => {
  const Hook = () => {
    const { countUp } = useCountUp({ delay: 1, end: 10 });
    return <span>{countUp}</span>;
  };

  const { container } = render(<Hook />);
  const span = container.firstChild;
  jest.runAllTimers();
  expect(span.textContent).toEqual('0');
});

it('calls start correctly with hook', () => {
  const spy = {};
  const Hook = () => {
    const { countUp, start } = useCountUp({ end: 10 });
    spy.start = start;
    spyOn(spy, 'start');
    return <span onClick={spy.start}>{countUp}</span>;
  };

  const { container } = render(<Hook />);
  jest.runAllTimers();
  fireEvent.click(container.firstChild);
  jest.runAllTimers();
  expect(spy.start).toHaveBeenCalled();
});

it('calls reset correctly with hook', () => {
  const spy = {};
  const Hook = () => {
    const { countUp, reset } = useCountUp({ end: 10 });
    spy.reset = reset;
    spyOn(spy, 'reset');
    return <span onClick={spy.reset}>{countUp}</span>;
  };

  const { container } = render(<Hook />);
  jest.runAllTimers();
  fireEvent.click(container.firstChild);
  jest.runAllTimers();
  expect(spy.reset).toHaveBeenCalled();
});

it('calls update correctly with hook', () => {
  const spy = {};

  const Hook = () => {
    const onUpdate = jest.fn();
    const { countUp, update } = useCountUp({ end: 10, onUpdate });
    spy.onUpdate = onUpdate;
    return <span onClick={update}>{countUp}</span>;
  };

  const { container } = render(<Hook />);
  jest.runAllTimers();
  fireEvent.click(container.firstChild);
  jest.runAllTimers();
  expect(spy.onUpdate).toHaveBeenCalled();
});

it('calls pauseResume correctly with hook', () => {
  const spy = {};

  const Hook = () => {
    const onPauseResume = jest.fn();
    const { countUp, pauseResume } = useCountUp({ end: 10, onPauseResume });
    spy.onPauseResume = onPauseResume;
    return <span onClick={pauseResume}>{countUp}</span>;
  };

  const { container } = render(<Hook />);
  jest.runAllTimers();
  fireEvent.click(container.firstChild);
  jest.runAllTimers();
  expect(spy.onPauseResume).toHaveBeenCalled();
});
