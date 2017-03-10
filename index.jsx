// @flow

import React, { Component, Element } from 'react';
import Count from 'countup.js';

type Props = {
  callback?: () => void,
  className?: string,
  decimal?: string,
  decimals?: number,
  duration?: number,
  end: number,
  prefix?: string,
  redraw?: boolean, // eslint-disable-line react/no-unused-prop-types
  separator?: string,
  start?: number,
  style?: {},
  suffix?: string,
  useEasing?: boolean,
  useGrouping?: boolean,
};

export const startAnimation = (component: Component<*, *, *>) => {
  if (component && component.spanElement) {
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
    } : Props = component.props;

    new Count(component.spanElement, start, end, decimals, duration, {
      useEasing,
      useGrouping,
      separator,
      decimal,
      prefix,
      suffix,
    }).start(callback);
  } else {
    throw new Error('You need to pass the CountUp component as an argument!\neg. this.myCountUp.startAnimation(this.myCountUp);');
  }
};

/**
 * Component
 */
class CountUp extends Component {
  static defaultProps = {
    callback: () => {},
    className: undefined,
    decimal: '.',
    decimals: 0,
    duration: 3,
    end: 100,
    prefix: '',
    separator: ',',
    start: 0,
    suffix: '',
    redraw: false,
    style: undefined,
    useEasing: true,
    useGrouping: false,
  }

  componentDidMount() {
    this.startAnimation(this);
  }

  shouldComponentUpdate(nextProps: Props) {
    const hasCertainPropsChanged = (
      this.props.duration !== nextProps.duration ||
      this.props.end !== nextProps.end ||
      this.props.start !== nextProps.start
    );

    return nextProps.redraw || hasCertainPropsChanged;
  }

  componentDidUpdate() {
    this.startAnimation(this);
  }

  spanElement = null

  refSpan = (span: Element<*>) => {
    this.spanElement = span;
  }

  props: Props

  startAnimation = startAnimation

  render() {
    const { className, start, style } = this.props;

    return <span className={className} style={style} ref={this.refSpan}>{start}</span>;
  }
}

export default CountUp;
