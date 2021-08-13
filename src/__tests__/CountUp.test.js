import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import CountUp from '../index';

afterEach(cleanup);

describe('CountUp component', () => {
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

  it('clear previous counter when duration changed', (done) => {
    const { container, rerender } = render(<CountUp duration={1} end={100} />);

    rerender(<CountUp duration={0.5} end={10} />);

    setTimeout(() => {
      const span = container.firstChild;
      expect(span.textContent).toEqual('10');
      done();
    }, 1200);
  });

  it('re-renders when suffix changes', (done) => {
    const { container, rerender } = render(<CountUp duration={1} end={1} />);

    rerender(<CountUp duration={1} end={30} suffix=" sec" />);

    setTimeout(() => {
      const span = container.firstChild;
      expect(span.textContent).toEqual('30 sec');
      done();
    }, 1200);
  });

  it('re-renders when the separator changes', (done) => {
    const { container, rerender } = render(
      <CountUp duration={1} end={1} separator="" />,
    );

    rerender(<CountUp duration={1} end={3000} separator=" " />);

    setTimeout(() => {
      const span = container.firstChild;
      expect(span.textContent).toEqual('3 000');
      done();
    }, 1200);
  });

  it('re-renders when the decimals changes', (done) => {
    const { container, rerender } = render(
      <CountUp duration={1} end={1} decimals={0} />,
    );

    rerender(<CountUp duration={1} end={10.5} decimals={1} />);

    setTimeout(() => {
      const span = container.firstChild;
      expect(span.textContent).toEqual('10.5');
      done();
    }, 1200);
  });

  it('re-renders when the decimal changes', (done) => {
    const { container, rerender } = render(<CountUp duration={1} end={1} />);

    rerender(<CountUp duration={1} end={10.5} decimals={1} decimal="." />);

    setTimeout(() => {
      const span = container.firstChild;
      expect(span.textContent).toEqual('10.5');
      done();
    }, 1200);
  });

  it('re-renders when the prefix changes', (done) => {
    const { container, rerender } = render(
      <CountUp duration={1} end={1} prefix="" />,
    );

    rerender(<CountUp duration={1} end={30} prefix="->" />);

    setTimeout(() => {
      const span = container.firstChild;
      expect(span.textContent).toEqual('->30');
      done();
    }, 1200);
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
      <CountUp end={10}>
        {({ countUpRef }) => <div ref={countUpRef} />}
      </CountUp>,
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

  it('re-renders with redraw={true} correctly', () => {
    const onStart = jest.fn();
    const { rerender } = render(<CountUp end={10} onStart={onStart} redraw />);

    rerender(<CountUp end={10} onStart={onStart} redraw />);
    expect(onStart).toHaveBeenCalledTimes(2);
  });

  it('does not reset if preserveValue is true', (done) => {
    const { container, rerender } = render(
      <CountUp duration={1} end={10} preserveValue />,
    );

    setTimeout(() => {
      rerender(<CountUp duration={1} end={20} preserveValue />);
      const span = container.firstChild;
      expect(span.textContent).toEqual('10');
      done();
    }, 1000);
  });

  it('does not reset if preserveValue is true and suffix is set', (done) => {
    const { container, rerender } = render(
      <CountUp duration={1} end={10} suffix="%" preserveValue />,
    );

    setTimeout(() => {
      rerender(<CountUp duration={1} end={20} suffix="%" preserveValue />);
      const span = container.firstChild;
      expect(span.textContent).toEqual('10%');
      done();
    }, 1000);
  });

  it('does not reset if preserveValue is true and prefix is set', (done) => {
    const { container, rerender } = render(
      <CountUp duration={1} end={10} prefix="->" preserveValue />,
    );

    setTimeout(() => {
      rerender(<CountUp duration={1} end={20} prefix="->" preserveValue />);
      const span = container.firstChild;
      expect(span.textContent).toEqual('->10');
      done();
    }, 1000);
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

    render(<CountUp end={10}>{() => <div />}</CountUp>);

    expect(console.error).toBeCalled();
  });
});
