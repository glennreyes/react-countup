// @flow

import React from 'react';
import Count from 'countup.js';
import type { Component } from 'react';

type Props = {
  className: string,
  decimal: string,
  decimals: number,
  duration: number,
  easingFn: () => void,
  end: number,
  formattingFn: (start: number) => string,
  onComplete: () => void,
  onStart: () => void,
  prefix: string,
  redraw: boolean,
  separator: string,
  start: number,
  style: {},
  suffix: string,
  useEasing: boolean,
};

type FormatNumberFn = (
  start: number,
  options: {
    decimal: string,
    decimals: number,
    separator: string,
    prefix: string,
    suffix: string,
  },
) => string;

// Adapted from the countup.js format number function
// https://github.com/inorganik/countUp.js/blob/master/countUp.js#L46-L60
export const formatNumber: FormatNumberFn = (start, options) => {
  const neg = start < 0;
  const num = `${Math.abs(start).toFixed(options.decimals)}`;
  const x = num.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? `${options.decimal}${x[1]}` : '';
  const rgx = /(\d+)(\d{3})/;

  if (options.separator) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, `$1${options.separator}$2`);
    }
  }

  return `${neg ? '-' : ''}${options.prefix || ''}${x1}${x2}${options.suffix ||
    ''}`;
};

export const startAnimation = (component: Component<*, *>) => {
  if (!(component && component.spanElement)) {
    throw new Error(
      'You need to pass the CountUp component as an argument!\neg. this.myCountUp.startAnimation(this.myCountUp);',
    );
  }

  const {
    decimal,
    decimals,
    duration,
    easingFn,
    end,
    formattingFn,
    onComplete,
    onStart,
    prefix,
    separator,
    start,
    suffix,
    useEasing,
  }: Props = component.props;

  const countupInstance = new Count(
    component.spanElement,
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

  if (typeof onStart === 'function') {
    onStart();
  }

  countupInstance.start(onComplete);
};

export default class CountUp extends React.Component<*, *> {
  static defaultProps = {
    className: undefined,
    decimal: '.',
    decimals: 0,
    duration: 3,
    easingFn: null,
    end: 100,
    formattingFn: null,
    onComplete: undefined,
    onStart: undefined,
    prefix: '',
    separator: '',
    start: 0,
    suffix: '',
    redraw: false,
    style: undefined,
    useEasing: true,
  };

  componentDidMount() {
    startAnimation(this);
  }

  shouldComponentUpdate(nextProps: Props) {
    const hasCertainPropsChanged =
      this.props.duration !== nextProps.duration ||
      this.props.end !== nextProps.end ||
      this.props.start !== nextProps.start;

    return nextProps.redraw || hasCertainPropsChanged;
  }

  componentDidUpdate() {
    startAnimation(this);
  }

  spanElement = null;

  refSpan = (span: Element<*>) => {
    this.spanElement = span;
  };

  refSpan: () => void;

  props: Props;

  render() {
    const {
      className,
      start,
      decimal,
      decimals,
      separator,
      prefix,
      suffix,
      style,
      formattingFn,
    } = this.props;

    return (
      <span className={className} ref={this.refSpan} style={style}>
        {typeof formattingFn === 'function'
          ? formattingFn(start)
          : formatNumber(start, {
              decimal,
              decimals,
              separator,
              prefix,
              suffix,
            })}
      </span>
    );
  }
}
