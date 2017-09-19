// @flow

import React, { Component, PropTypes } from 'react';
import Count from 'countup.js';

// Adapted from the countup.js format number function
// https://github.com/inorganik/countUp.js/blob/master/countUp.js#L46-L60
export const formatNumber = (start, options) => {
  const num = `${start.toFixed(options.decimals)}`;
  const x = num.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? `${options.decimal}${x[1]}` : '';
  const rgx = /(\d+)(\d{3})/;

  if (options.useGrouping && options.separator) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, `$1${options.separator}$2`);
    }
  }
  return `${options.prefix}${x1}${x2}${options.suffix}`;
};

export const startAnimation = (component) => {
  if (!(component && component.spanElement)) {
    throw new Error(
      'You need to pass the CountUp component as an argument!\neg. this.myCountUp.startAnimation(this.myCountUp);',
    );
  }

  const { decimals, duration, end, start } = component.props;

  const countupInstance = new Count(
    component.spanElement,
    start,
    end,
    decimals,
    duration,
  );

  countupInstance.start();
};

class CountUp extends Component {
  componentDidMount() {
    startAnimation(this);
  }

  shouldComponentUpdate(nextProps) {
    const hasCertainPropsChanged =
      this.props.duration !== nextProps.duration ||
      this.props.end !== nextProps.end ||
      this.props.start !== nextProps.start;

    return nextProps.redraw || hasCertainPropsChanged;
  }

  componentDidUpdate() {
    startAnimation(this);
  }

  refSpan(span) {
    this.spanElement = span;
  }

  render() {
    const { decimal = '.', decimals = 0, className, start = 0 } = this.props;

    return (
      <span
        className={className}
        ref={(span) => {
          this.refSpan(span);
        }}
      >
        {formatNumber(start, {
          decimal,
          decimals,
        })}
      </span>
    );
  }
}

CountUp.propTypes = {
  className: PropTypes.string,
  decimal: PropTypes.string,
  decimals: PropTypes.number,
  duration: PropTypes.number,
  easingFn: PropTypes.func,
  end: PropTypes.number,
  redraw: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  start: PropTypes.number,
};

module.exports = CountUp;
