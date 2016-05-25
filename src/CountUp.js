import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
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
      decimal,
      prefix,
      suffix,
      callback,
    } = this.props;

    const countup = new Count(findDOMNode(this), start, end, {
      duration,
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
    return <span></span>;
  }
}

CountUp.defaultProps = {
  className: 'CountUp',
  start: 0,
  end: 100,
  duration: 2.5,
  useEasing: true,
  useGrouping: true,
  separator: ',',
  decimal: '.',
  prefix: '',
  suffix: '',
};

CountUp.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  duration: PropTypes.number,
  useEasing: PropTypes.bool,
  useGrouping: PropTypes.bool,
  separator: PropTypes.string,
  decimal: PropTypes.string,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  callback: PropTypes.func,
};

export default CountUp;
