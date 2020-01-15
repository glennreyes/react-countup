import { CountUp } from 'countup.js';

export const createCountUpInstance = (
  el: HTMLElement | HTMLInputElement,
  props,
) => {
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
    // duration,
    decimal,
    decimalPlaces: decimals,
    // easingFn,
    // formattingFn,
    // numerals,
    separator,
    prefix,
    suffix,
    useEasing,
    useGrouping: !!separator,
  });
};
