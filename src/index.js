import Count from 'countup.js';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import warning from 'warning';

class CountUp extends Component {
  static defaultProps = {
    decimal: '.',
    decimals: 0,
    delay: null,
    duration: null,
    easingFn: null,
    formattingFn: null,
    onEnd: null,
    onPauseResume: null,
    onReset: null,
    onStart: null,
    onUpdate: null,
    prefix: '',
    separator: '',
    start: 0,
    suffix: '',
    redraw: true,
    style: undefined,
    useEasing: true,
  };

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

  componentDidMount() {
    const { autostart, delay } = this.props;
    this.instance = this.createInstance();

    if (autostart || delay === 0) this.start();

    if (delay) setTimeout(this.start, delay * 1000);
  }

  shouldComponentUpdate(nextProps) {
    const hasCertainPropsChanged =
      this.props.duration !== nextProps.duration ||
      this.props.end !== nextProps.end ||
      this.props.start !== nextProps.start;

    return this.props.redraw || hasCertainPropsChanged;
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

  createInstance = () => {
    // Warn when user didn't use containerRef at all
    warning(
      this.containerRef.current &&
        this.containerRef.current instanceof HTMLElement,
      `Couldn't find attached element to hook the CountUp instance into! Try to attach "containerRef" from the render prop to a an HTMLElement, eg. <span ref={containerRef} />.`,
    );

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
    } = this.props;

    return new Count(
      this.containerRef.current,
      start,
      end,
      decimals,
      duration,
      {
        decimal,
        easingFn,
        formattingFn,
        separator,
        prefix,
        suffix,
        useEasing,
        useGrouping: !!separator,
      },
    );
  };

  pauseResume = (...args) => {
    const { onPauseResume } = this.props;

    if (typeof onPauseResume === 'function') onPauseResume(this);

    this.instance.pauseResume(...args);
  };

  reset = (...args) => {
    const { onReset } = this.props;

    if (typeof onReset === 'function') onReset(this);

    this.instance.reset(...args);
  };

  start = () => {
    const { onEnd, onStart } = this.props;

    this.instance.start(
      typeof onEnd === 'function' ? () => onEnd(this) : undefined,
    );
    if (typeof onStart === 'function') onStart(this);
  };

  update = (...args) => {
    const { onUpdate } = this.props;

    this.instance.reset(...args);
    if (typeof onUpdate === 'function') onUpdate(this);
  };

  containerRef = React.createRef();

  render() {
    const { children, className, style } = this.props;
    const { containerRef, pauseResume, reset, start, update } = this;

    if (typeof children === 'function') {
      return children({ containerRef, pauseResume, reset, start, update });
    }

    return <span className={className} ref={containerRef} style={style} />;
  }
}

export default CountUp;
