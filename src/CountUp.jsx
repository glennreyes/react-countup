import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import shallowCompare from 'react-addons-shallow-compare';
import Count from 'countup.js';

class CountUp extends React.Component {
  componentDidMount() {
    const {
      start,
      end,
      duration,
      useEasing,
      useGrouping,
      separator,
      decimals,
      decimal,
      prefix,
      suffix,
      callback,
    } = this.props;

    this.state = {
      start,
      end,
      duration,
      useEasing,
      useGrouping,
      separator,
      decimals,
      decimal,
      prefix,
      suffix,
      callback,
    };

    this.startAnimation();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.redraw
      ? true
      : shallowCompare(this, nextProps, nextState);
  }

  componentDidUpdate() {
    this.startAnimation();
  }

  startAnimation() {
    const {
      start,
      end,
      duration,
      useEasing,
      useGrouping,
      separator,
      decimals,
      decimal,
      prefix,
      suffix,
      callback,
    } = this.props;

    const countup = new Count(findDOMNode(this), start, end, decimals, duration, {
      useEasing,
      useGrouping,
      separator,
      decimal,
      prefix,
      suffix,
    });

    countup.start(callback);
  }

  render() {
    const { className, start, style } = this.props;

    return <span className={className} style={style}>{start}</span>;
  }
}

CountUp.defaultProps = {
  start: 0,
  end: 2016,
  decimals: 0,
  duration: 4,
  useEasing: true,
  useGrouping: false,
  separator: ',',
  decimal: '.',
  prefix: '',
  suffix: '',
  redraw: false,
};

CountUp.propTypes = {
  className: PropTypes.node,
  style: PropTypes.object,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  decimals: PropTypes.number,
  duration: PropTypes.number,
  useEasing: PropTypes.bool,
  useGrouping: PropTypes.bool,
  separator: PropTypes.string,
  decimal: PropTypes.string,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  callback: PropTypes.func,
  redraw: PropTypes.bool,
};

export default CountUp;
