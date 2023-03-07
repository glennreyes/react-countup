import { CountUp } from 'countup.js';
import { CountUpInstanceProps } from './types';

export const createCountUpInstance = (
  el: string | HTMLElement,
  props: CountUpInstanceProps,
): CountUp => {
  const {
    decimal,
    decimals,
    duration,
    easingFn,
    end,
    formattingFn,
    numerals,
    prefix,
    separator,
    start,
    suffix,
    useEasing,
    useIndianSeparators,
    enableScrollSpy,
    scrollSpyDelay,
    scrollSpyOnce,
  } = props;

  return new CountUp(el, end, {
    startVal: start,
    duration,
    decimal,
    decimalPlaces: decimals,
    easingFn,
    formattingFn,
    numerals,
    separator,
    prefix,
    suffix,
    useEasing,
    useIndianSeparators,
    useGrouping: !!separator,
    enableScrollSpy,
    scrollSpyDelay,
    scrollSpyOnce,
  });
};
