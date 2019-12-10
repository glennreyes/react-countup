import * as React from 'react';

export interface CountUpProps {
  className?: string;
  decimal?: string;
  decimals?: number;
  delay?: number;
  duration?: number;
  end: number;
  prefix?: string;
  redraw?: boolean;
  preserveValue?: boolean;
  separator?: string;
  start?: number;
  suffix?: string;
  useEasing?: boolean;
  easingFn?: (t: number, b: number, c: number, d: number) => number;
  formattingFn?: (n: number) => string;
  onEnd?: ({ pauseResume, reset, start, update }) => void;
  onStart?: ({ pauseResume, reset, start, update }) => void;
  onPauseResume?: ({ reset, start, update }) => void;
  onReset?: ({ pauseResume, start, update }) => void;
  onUpdate?: ({ pauseResume, reset, start }) => void;
}

declare class CountUp extends React.Component<CountUpProps, any> {}

export interface useCountUpProps {
  start?: number;
  end: number;
  delay?: number;
  duration?: number;
  onReset?: ({ pauseResume, start, update }) => void;
  onUpdate?: ({ pauseResume, reset, start }) => void;
  onPauseResume?: ({ reset, start, update }) => void;
  onStart?: ({ pauseResume, reset, start, update }) => void;
  onEnd?: ({ pauseResume, reset, start, update }) => void;
}

type countUpHook = (
  useCountUpProps,
) => {
  countUp: number | string;
  onReset: () => void;
  nUpdate: () => void;
  onPauseResume: () => void;
  onStart: ({ pauseResume }) => void;
  onEnd: ({ pauseResume }) => void;
};

export const useCountUp: countUpHook;

export default CountUp;
