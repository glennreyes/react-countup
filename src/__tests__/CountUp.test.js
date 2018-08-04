import React from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import CountUp from '../index';

afterEach(cleanup);

it('renders start value correctly', () => {
  const { container } = render(<CountUp end={10} />);

  expect(container).toMatchSnapshot();
});

it('re-renders change of start value correctly', () => {
  const { container, rerender } = render(<CountUp end={10} />);

  rerender(<CountUp start={5} end={10} />);

  expect(container).toMatchSnapshot();
});

it('re-renders change of duration value correctly', () => {
  const { container, rerender } = render(<CountUp duration={1} end={10} />);

  rerender(<CountUp duration={2} end={10} />);

  expect(container).toMatchSnapshot();
});

it('re-renders change of end value correctly', () => {
  const { container, rerender } = render(<CountUp end={10} />);

  rerender(<CountUp end={5} />);

  expect(container).toMatchSnapshot();
});

it('re-renders with redraw={false} correctly', () => {
  const { container, rerender } = render(<CountUp redraw={false} end={10} />);

  rerender(<CountUp redraw={false} end={10} />);

  expect(container).toMatchSnapshot();
});

it('renders with delay correctly', () => {
  const { container } = render(<CountUp delay={1} end={10} />);

  expect(container).toMatchSnapshot();
});

it('renders with delay as a render prop component correctly', () => {
  const { container } = render(
    <CountUp delay={1} end={10}>
      {({ countUpRef }) => <div ref={countUpRef} />}
    </CountUp>,
  );

  expect(container).toMatchSnapshot();
});

it('renders as a render prop component correctly', () => {
  const { container } = render(
    <CountUp end={10}>{({ countUpRef }) => <div ref={countUpRef} />}</CountUp>,
  );

  expect(container).toMatchSnapshot();
});

it('renders with autostart correctly', () => {
  const { container } = render(
    <CountUp autostart end={10}>
      {({ countUpRef }) => <div ref={countUpRef} />}
    </CountUp>,
  );

  expect(container).toMatchSnapshot();
});

it('calls start correctly', () => {
  const spy = {};

  const { container } = render(
    <CountUp end={10}>
      {({ countUpRef, start }) => {
        spy.start = start;
        jest.spyOn(spy, 'start');
        return <button onClick={spy.start} ref={countUpRef} />;
      }}
    </CountUp>,
  );

  fireEvent.click(container.firstElementChild);

  expect(spy.start).toHaveBeenCalled();
});

it('calls pauseResume correctly', () => {
  const spy = {};

  const { container } = render(
    <CountUp end={10}>
      {({ countUpRef, pauseResume }) => {
        spy.pauseResume = pauseResume;
        jest.spyOn(spy, 'pauseResume');
        return <button onClick={spy.pauseResume} ref={countUpRef} />;
      }}
    </CountUp>,
  );

  fireEvent.click(container.firstElementChild);

  expect(spy.pauseResume).toHaveBeenCalled();
});

it('calls update correctly', () => {
  const spy = {};

  const { container } = render(
    <CountUp end={10}>
      {({ countUpRef, update }) => {
        spy.update = update;
        jest.spyOn(spy, 'update');
        return <button onClick={spy.update} ref={countUpRef} />;
      }}
    </CountUp>,
  );

  fireEvent.click(container.firstElementChild);

  expect(spy.update).toHaveBeenCalled();
});

it('calls reset correctly', () => {
  const spy = {};

  const { container } = render(
    <CountUp end={10}>
      {({ countUpRef, reset }) => {
        spy.reset = reset;
        jest.spyOn(spy, 'reset');
        return <button onClick={spy.reset} ref={countUpRef} />;
      }}
    </CountUp>,
  );

  fireEvent.click(container.firstElementChild);

  expect(spy.reset).toHaveBeenCalled();
});

it('calls pauseResume in onStart callback correctly', () => {
  const spy = {};

  render(
    <CountUp
      end={10}
      onStart={({ pauseResume }) => {
        spy.pauseResume = pauseResume;
        jest.spyOn(spy, 'pauseResume');
      }}
    />,
  );

  spy.pauseResume();

  expect(spy.pauseResume).toHaveBeenCalled();
});

it('throws warning if ref not attached to a component', () => {
  console.error = jest.fn();
  jest.spyOn(console, 'error');

  render(<CountUp end={10}>{({ countUpRef }) => <div />}</CountUp>);

  expect(console.error).toBeCalled();
});
