import { CountUp } from 'countup.js';
import { CountUpProps } from './CountUp';
import { useCountUpProps } from './useCountUp';

export const createCountUpInstance = (el: string | HTMLElement | HTMLInputElement, props: useCountUpProps | CountUpProps) => {
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
    useGrouping: !!separator,
  });
};
