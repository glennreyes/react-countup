// @flow

import React, { Component, Element } from 'react';
import Count from 'countup.js';

type Props = {
  className: string,
  decimal: string,
  decimals: number,
  duration: number,
  end: number,
  onComplete: () => void,
  onStart: () => void,
  prefix: string,
  redraw: boolean, // eslint-disable-line react/no-unused-prop-types
  separator: string,
  start: number,
  style: {},
  suffix: string,
  useEasing: boolean,
  useGrouping: boolean,
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
      onComplete,
      onStart,
    } : Props = component.props;

    const countupInstance = new Count(
      component.spanElement,
      start,
      end,
      decimals,
      duration,
      {
        useEasing,
        useGrouping,
        separator,
        decimal,
        prefix,
        suffix,
      },
    );

    onStart();
    countupInstance.start(onComplete);
  } else {
    throw new Error('You need to pass the CountUp component as an argument!\neg. this.myCountUp.startAnimation(this.myCountUp);');
  }
};

/**
 * Component
 */
export default class CountUp extends Component {
  static defaultProps = {
    className: undefined,
    decimal: '.',
    decimals: 0,
    duration: 3,
    end: 100,
    onComplete: () => {},
    onStart: () => {},
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
    startAnimation(this);
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
    startAnimation(this);
  }

  spanElement = null

  refSpan = (span: Element<*>) => {
    this.spanElement = span;
  }

  props: Props

  render() {
    const { className, start, style } = this.props;

    return <span className={className} style={style} ref={this.refSpan}>{start}</span>;
  }
}
