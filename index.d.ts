import * as React from 'react';

type Function = () => void;
type UpdateFunction = (newEnd?: string | number) => void;

interface CallbackProps {
  onEnd?: (providedFn: {
    pauseResume: Function;
    reset: Function;
    start: Function;
    update: UpdateFunction;
  }) => void;
  onStart?: (providedFn: {
    pauseResume: Function;
    reset: Function;
    update: UpdateFunction;
  }) => void;
  onPauseResume?: (providedFn: {
    reset: Function;
    start: Function;
    update: UpdateFunction;
  }) => void;
  onReset?: (providedFn: {
    pauseResume: Function;
    start: Function;
    update: UpdateFunction;
  }) => void;
  onUpdate?: (providedFn: {
    pauseResume: Function;
    reset: Function;
    start: Function;
  }) => void;
}

export interface RenderCounterProps {
  countUpRef: React.RefObject<any>;
  start?: Function;
  pauseResume?: Function;
  reset?: Function;
  update?: UpdateFunction;
}

type EasingFn = (t: number, b: number, c: number, d: number) => number;

interface CommonProps {
  decimal?: string;
  decimals?: number;
  duration?: number;
  easingFn?: EasingFn;
  end: number;
  numerals?: string[];
  formattingFn?: (n: number) => string;
  prefix?: string;
  separator?: string;
  start?: number;
  suffix?: string;
  useEasing?: boolean;
}

export interface CountUpProps extends CommonProps, CallbackProps {
  className?: string;
  delay?: number;
  redraw?: boolean;
  preserveValue?: boolean;
  children?: (props: RenderCounterProps) => JSX.Element;
  style?: React.CSSProperties;
}

declare class CountUp extends React.Component<CountUpProps> {}

export interface useCountUpProps extends CommonProps, CallbackProps {
  startOnMount?: boolean;
  ref: React.RefObject<any>;
  delay?: number;
}

type countUpHook = (
  arg: useCountUpProps,
) => {
  countUp: number | string;
  start: Function;
  pauseResume: Function;
  reset: Function;
  update: UpdateFunction;
};

export const useCountUp: countUpHook;

export default CountUp;
