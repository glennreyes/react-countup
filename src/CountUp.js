import PropTypes from 'prop-types';
import React, { useEffect, createRef, useRef } from 'react';
import warning from 'warning';
import { createCountUpInstance } from './common';

const arePropsEqual = (prevProps, nextProps) => {
  const hasCertainPropsEqual =
    prevProps.duration === nextProps.duration ||
    prevProps.end === nextProps.end ||
    prevProps.start === nextProps.start;

  return hasCertainPropsEqual || !nextProps.redraw;
};

const CountUp = React.memo(props => {
  const containerRef = createRef();
  const timer = useRef();
  const instance = useRef();

  const createInstance = () => {
    if (typeof props.children === 'function') {
      // Warn when user didn't use containerRef at all
      warning(
        containerRef.current &&
          (containerRef.current instanceof HTMLElement ||
            containerRef.current instanceof SVGTextElement),
        `Couldn't find attached element to hook the CountUp instance into! Try to attach "containerRef" from the render prop to a an HTMLElement, eg. <span ref={containerRef} />.`,
      );
    }
    return createCountUpInstance(containerRef.current, props);
  };

  useEffect(() => {
    const { children, delay } = props;
    instance.current = createInstance();

    // Don't invoke start if component is used as a render prop
    if (typeof children === 'function' && delay !== 0) return;

    // Otherwise just start immediately
    start();

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      instance.current.reset();
    };
  }, [props.duration, props.start]);

  useEffect(() => {
    // Only end value has changed, so reset and and re-animate with the updated
    // end value.

    // Don't invoke start if component is used as a render prop
    if (typeof children === 'function' && props.delay !== 0) return;

    instance.current.reset();
    instance.current.update(props.end);
  }, [props.end]);

  const pauseResume = () => {
    const { onPauseResume } = props;

    instance.current && instance.current.pauseResume();

    onPauseResume({ reset, start, update });
  };

  const reset = () => {
    const { onReset } = props;

    onReset({ pauseResume, start, update });
  };

  const restart = () => {
    reset();
    start();
  };

  const update = newEnd => {
    const { onUpdate } = props;

    instance.current && instance.current.update(newEnd);

    onUpdate({ pauseResume, reset, start });
  };

  const start = () => {
    const { delay, onEnd, onStart } = props;
    const run = () =>
      instance.current &&
      instance.current.start(() =>
        onEnd({ pauseResume, reset, start, update }),
      );

    // Delay start if delay prop is properly set
    if (delay > 0) {
      timer.current = setTimeout(run, delay * 1000);
    } else {
      run();
    }

    onStart({ pauseResume, reset, update });
  };

  const { children, className, style } = props;

  if (typeof children === 'function') {
    return children({
      countUpRef: containerRef,
      pauseResume,
      reset,
      start: restart,
      update,
    });
  }

  return <span className={className} ref={containerRef} style={style} />;
}, arePropsEqual);

CountUp.propTypes = {
  decimal: PropTypes.string,
  decimals: PropTypes.number,
  delay: PropTypes.number,
  easingFn: PropTypes.func,
  end: PropTypes.number.isRequired,
  formattingFn: PropTypes.func,
  onEnd: PropTypes.func,
  onStart: PropTypes.func,
  prefix: PropTypes.string,
  redraw: PropTypes.bool,
  separator: PropTypes.string,
  start: PropTypes.number,
  suffix: PropTypes.string,
  style: PropTypes.object,
  useEasing: PropTypes.bool,
};

CountUp.defaultProps = {
  decimal: '.',
  decimals: 0,
  delay: null,
  duration: null,
  easingFn: null,
  formattingFn: null,
  onEnd: () => {},
  onPauseResume: () => {},
  onReset: () => {},
  onStart: () => {},
  onUpdate: () => {},
  prefix: '',
  redraw: false,
  separator: '',
  start: 0,
  suffix: '',
  style: undefined,
  useEasing: true,
};

export default CountUp;
