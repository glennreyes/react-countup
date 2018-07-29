import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Count from 'countup.js';

class CountUp extends Component {
  static defaultProps = {
    decimal: '.',
    decimals: 0,
    duration: null,
    easingFn: null,
    formattingFn: null,
    onEnd: undefined,
    onStart: undefined,
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
    this.instance = this.createInstance();

    if (this.props.autostart) {
      this.start();
    }
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

    return new Count(this.spanRef.current, start, end, decimals, duration, {
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

  start = () => {
    const { onEnd, onStart } = this.props;

    if (typeof onStart === 'function') onStart(this);

    this.instance.start(
      typeof onEnd === 'function' ? () => onEnd(this) : undefined,
    );
  };

  spanRef = React.createRef();

  render() {
    const { className, style } = this.props;

    return <span className={className} ref={this.spanRef} style={style} />;
  }
}

export default CountUp;
