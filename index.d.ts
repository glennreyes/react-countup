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
