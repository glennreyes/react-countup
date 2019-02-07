import Count from 'countup.js';
import PropTypes from 'prop-types';
import React, { Component, useState, useEffect, useRef } from 'react';
import warning from 'warning';

const createCountUpInstance = (el, props) => {
  const {
    decimal,
    decimals,
    duration,
    easingFn,
    end,
    formattingFn,
    prefix,
    separator,
    start,
    suffix,
    useEasing,
  } = props;
  return new Count(el, start, end, decimals, duration, {
    decimal,
    easingFn,
    formattingFn,
    separator,
    prefix,
    suffix,
    useEasing,
    useGrouping: !!separator,
  });
};

class CountUp extends Component {
  static propTypes = {
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

  static defaultProps = {
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

  componentDidMount() {
    const { children, delay } = this.props;
    this.instance = this.createInstance();

    // Don't invoke start if component is used as a render prop
    if (typeof children === 'function' && delay !== 0) return;

    // Otherwise just start immediately
    this.start();
  }

  shouldComponentUpdate(nextProps) {
    const hasCertainPropsChanged =
      this.props.duration !== nextProps.duration ||
      this.props.end !== nextProps.end ||
      this.props.start !== nextProps.start;

    return hasCertainPropsChanged || this.props.redraw;
  }

  componentDidUpdate(prevProps) {
    // If duration or start has changed, there's no way to update the duration
    // or start value. So we need to re-create the CountUp instance in order to
    // restart it.
    if (
      this.props.duration !== prevProps.duration ||
      this.props.start !== prevProps.start
    ) {
      this.instance = this.createInstance();
      this.start();
    }

    // Only end value has changed, so reset and and re-animate with the updated
    // end value.
    if (this.props.end !== prevProps.end) {
      this.instance.reset();
      this.instance.update(this.props.end);
    }
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  createInstance = () => {
    if (typeof this.props.children === 'function') {
      // Warn when user didn't use containerRef at all
      warning(
        this.containerRef.current &&
          this.containerRef.current instanceof HTMLElement,
        `Couldn't find attached element to hook the CountUp instance into! Try to attach "containerRef" from the render prop to a an HTMLElement, eg. <span ref={containerRef} />.`,
      );
    }
    return createCountUpInstance(this.containerRef.current, this.props);
  };

  pauseResume = () => {
    const { reset, restart: start, update } = this;
    const { onPauseResume } = this.props;

    this.instance.pauseResume();

    onPauseResume({ reset, start, update });
  };

  reset = () => {
    const { pauseResume, restart: start, update } = this;
    const { onReset } = this.props;

    this.instance.reset();

    onReset({ pauseResume, start, update });
  };

  restart = () => {
    this.reset();
    this.start();
  };

  start = () => {
    const { pauseResume, reset, restart: start, update } = this;
    const { delay, onEnd, onStart } = this.props;
    const run = () =>
      this.instance.start(() => onEnd({ pauseResume, reset, start, update }));

    // Delay start if delay prop is properly set
    if (delay > 0) {
      this.timeoutId = setTimeout(run, delay * 1000);
    } else {
      run();
    }

    onStart({ pauseResume, reset, update });
  };

  update = newEnd => {
    const { pauseResume, reset, restart: start } = this;
    const { onUpdate } = this.props;

    this.instance.update(newEnd);

    onUpdate({ pauseResume, reset, start });
  };

  containerRef = React.createRef();

  render() {
    const { children, className, style } = this.props;
    const { containerRef, pauseResume, reset, restart, update } = this;

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
  }
}
// CountUp.js requires an element to execute it's animation,
// since it only checks for truthy values -1 is enough to mock an element.
const NO_ELEMENT = -1;

export const useCountUp = props => {
  const _props = { ...CountUp.defaultProps, ...props };
  const { start, formattingFn } = _props;
  const [count, setCount] = useState(
    typeof formattingFn === 'function' ? formattingFn(start) : start,
  );
  const countUpRef = useRef(null);

  const createInstance = () => {
    const countUp = createCountUpInstance(NO_ELEMENT, _props);
    let formattingFnRef = countUp.options.formattingFn;
    countUp.options.formattingFn = (...args) => {
      const result = formattingFnRef(...args);
      setCount(result);
    };
    return countUp;
  };

  const getCountUp = () => {
    const countUp = countUpRef.current;
    if (countUp !== null) {
      return countUp;
    }
    const newCountUp = createInstance();
    countUpRef.current = newCountUp;
    return newCountUp;
  };

  const reset = () => {
    const { onReset } = _props;
    getCountUp().reset();
    onReset({ pauseResume, start: restart, update });
  };

  const restart = () => {
    const { onStart, onEnd } = _props;
    getCountUp().reset();
    getCountUp().start(() => {
      onEnd({ pauseResume, reset, start: restart, update });
    });
    onStart({ pauseResume, reset, update });
  };

  const pauseResume = () => {
    const { onPauseResume } = _props;
    getCountUp().pauseResume();
    onPauseResume({ reset, start: restart, update });
  };

  const update = newEnd => {
    const { onUpdate } = _props;
    getCountUp().update(newEnd);
    onUpdate({ pauseResume, reset, start: restart });
  };

  useEffect(() => {
    const { delay, onStart, onEnd } = _props;
    const timeout = setTimeout(() => {
      onStart({ pauseResume, reset, update });
      getCountUp().start(() => {
        clearTimeout(timeout);
        onEnd({ pauseResume, reset, start: restart, update });
      });
    }, delay * 1000);
  }, []);

  return { countUp: count, start: restart, pauseResume, reset, update };
};

export default CountUp;
