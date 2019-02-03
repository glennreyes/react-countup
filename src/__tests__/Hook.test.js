'use strict';

import React from 'react';
import {
  cleanup,
  flushEffects,
  render,
  fireEvent,
} from 'react-testing-library';
import { useCountUp } from '../index';

jest.useFakeTimers();
afterEach(cleanup);

const CountUpWithHook = ({ start, end, delay }) => {
  const { countUp } = useCountUp({ start, end, delay });
  return <span>{countUp}</span>;
};

it('renders start value correctly with hook', () => {
  const { container } = render(<CountUpWithHook end={10} />);
  const span = container.firstChild;
  flushEffects();
  jest.runAllTimers();
  expect(span.textContent).toEqual('0');
});

it('renders with delay correctly with hook', () => {
  const { container } = render(<CountUpWithHook delay={1} end={10} />);
  const span = container.firstChild;
  flushEffects();
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
  flushEffects();
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
  flushEffects();
  jest.runAllTimers();
  fireEvent.click(container.firstChild);
  jest.runAllTimers();
  expect(spy.reset).toHaveBeenCalled();
});

it('calls update correctly with hook', () => {
  const spy = {};

  const Hook = () => {
    const { countUp, update } = useCountUp({ end: 10 });
    spy.update = update;
    spyOn(spy, 'update');
    return <span onClick={spy.update}>{countUp}</span>;
  };

  const { container } = render(<Hook />);
  flushEffects();
  jest.runAllTimers();
  fireEvent.click(container.firstChild);
  jest.runAllTimers();
  expect(spy.update).toHaveBeenCalled();
});

it('calls pauseResume correctly with hook', () => {
  const spy = {};

  const Hook = () => {
    const { countUp, pauseResume } = useCountUp({ end: 10 });
    spy.pauseResume = pauseResume;
    spyOn(spy, 'pauseResume');
    return <span onClick={spy.pauseResume}>{countUp}</span>;
  };

  const { container } = render(<Hook />);
  flushEffects();
  jest.runAllTimers();
  fireEvent.click(container.firstChild);
  jest.runAllTimers();
  expect(spy.pauseResume).toHaveBeenCalled();
});
