import * as React from 'react';

export interface RenderCounterProps {
  countUpRef: React.RefObject<any>;
  start?: () => void;
  pauseResume?: () => void;
  reset?: () => void;
  update?: (newEnd?: number) => void;
}

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
  onEnd?: ({ pauseResume: () => void, reset: () => void, start: () => void, update: () => void }) => void;
  onStart?: ({ pauseResume: () => void, reset: () => void, start: () => void, update: () => void }) => void;
  onPauseResume?: ({ reset: () => void, start: () => void, update: () => void }) => void;
  onReset?: ({ pauseResume: () => void, start: () => void, update: () => void }) => void;
  onUpdate?: ({ pauseResume: () => void, reset: () => void, start: () => void }) => void;
  children?: (props: RenderCounterProps) => JSX.Element;
}

declare class CountUp extends React.Component<CountUpProps, any> {}

export interface useCountUpProps {
  startOnMount?: boolean;
  start?: number;
  end: number;
  delay?: number;
  duration?: number;
  onReset?: ({ pauseResume: () => void, start: () => void, update: () => void }) => void;
  onUpdate?: ({ pauseResume: () => void, reset: () => void, start: () => void }) => void;
  onPauseResume?: ({ reset: () => void, start: () => void, update: () => void }) => void;
  onStart?: ({ pauseResume: () => void, reset: () => void, start: () => void, update: () => void }) => void;
  onEnd?: ({ pauseResume: () => void, reset: () => void, start: () => void, update: () => void }) => void;
}

type countUpHook = (
  useCountUpProps,
) => {
  countUp: number | string;
  start: () => void;
  pauseResume: () => void;
  reset: () => void;
  update: (newEnd?: number) => void;
};

export const useCountUp: countUpHook;

export default CountUp;
