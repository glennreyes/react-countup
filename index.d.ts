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
  onEnd?: (providedFn: { pauseResume: () => void, reset: () => void, start: () => void, update: () => void }) => void;
  onStart?: (providedFn: { pauseResume: () => void, reset: () => void, start: () => void, update: () => void }) => void;
  onPauseResume?: (providedFn: { reset: () => void, start: () => void, update: () => void }) => void;
  onReset?: (providedFn: { pauseResume: () => void, start: () => void, update: () => void }) => void;
  onUpdate?: (providedFn: { pauseResume: () => void, reset: () => void, start: () => void }) => void;
  children?: (props: RenderCounterProps) => JSX.Element;
}

declare class CountUp extends React.Component<CountUpProps, any> {}

export interface useCountUpProps {
  startOnMount?: boolean;
  start?: number;
  end: number;
  delay?: number;
  duration?: number;
  onReset?: (providedFn: { pauseResume: () => void, start: () => void, update: (newEnd?: number) => void }) => void;
  onUpdate?: (providedFn: { pauseResume: () => void, reset: () => void, start: () => void }) => void;
  onPauseResume?: (providedFn: { reset: () => void, start: () => void, update: (newEnd?: number) => void }) => void;
  onStart?: (providedFn: { pauseResume: () => void, reset: () => void, start: () => void, update: (newEnd?: number) => void }) => void;
  onEnd?: (providedFn: { pauseResume: () => void, reset: () => void, start: () => void, update: (newEnd?: number) => void }) => void;
}

type countUpHook = (
  arg: useCountUpProps
) => {
  countUp: number | string;
  start: () => void;
  pauseResume: () => void;
  reset: () => void;
  update: (newEnd?: number) => void;
};

export const useCountUp: countUpHook;

export default CountUp;
