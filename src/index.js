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
    // redraw: false,
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
    // redraw: PropTypes.bool,
    separator: PropTypes.string,
    start: PropTypes.number,
    suffix: PropTypes.string,
    style: PropTypes.object,
    useEasing: PropTypes.bool,
  };

  componentDidMount() {
    const {
      decimal,
      decimals,
      duration,
      easingFn,
      end,
      formattingFn,
      onEnd,
      onStart,
      prefix,
      separator,
      start,
      suffix,
      useEasing,
    } = this.props;

    this.countUpInstance = new Count(
      this.spanRef.current,
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

    if (typeof onStart === 'function') onStart(this.countUpInstance);

    this.countUpInstance.start(
      typeof onEnd === 'function'
        ? () => onEnd(this.countUpInstance)
        : undefined,
    );
  }

  spanRef = React.createRef();

  render() {
    const { className, style } = this.props;

    return <span className={className} ref={this.spanRef} style={style} />;
  }
}

export default CountUp;
