import CountUp from 'countup.js';

export const createCountUpInstance = (el, props) => {
  const {
    decimal,
    decimals,
    duration,
    easingFn,
    end,
    formattingFn,
    prefix,
    separator,
    start,
    suffix,
    useEasing,
  } = props;
  return new CountUp(el, start, end, decimals, duration, {
    decimal,
    easingFn,
    formattingFn,
    separator,
    prefix,
    suffix,
    useEasing,
    useGrouping: !!separator,
  });
};
