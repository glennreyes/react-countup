import * as React from 'react';

type Function = () => void;
export type UpdateFn = (newEnd: string | number) => void;

export interface OnEndArgs {
    pauseResume: Function;
    reset: Function;
    start: Function;
    update: UpdateFn;
}
export type OnEndCallback = (args: OnEndArgs) => void;

export interface OnStartArgs {
    pauseResume: Function;
    reset: Function;
    update: UpdateFn;
}
export type OnStartCallback = (args: OnStartArgs) => void;

export interface OnPauseResumeArgs {
    reset: Function;
    start: Function;
    update: UpdateFn;
}
export type OnPauseResumeCallback = (args: OnPauseResumeArgs) => void;

export interface OnResetArgs {
    pauseResume: Function;
    start: Function;
    update: UpdateFn;
}
export type OnResetCallback = (args: OnResetArgs) => void;

export interface OnUpdateArgs {
    pauseResume: Function;
    reset: Function;
    start: Function;
}
export type OnUpdateCallback = (args: OnUpdateArgs) => void;

type EasingFn = (t: number, b: number, c: number, d: number) => number;

export interface CountUpInstanceProps {
  decimal?: string;
  decimals?: number;
  duration?: number;
  easingFn?: EasingFn;
  end: number;
  formattingFn?: (n: number) => string;
  prefix?: string;
  separator?: string;
  start?: number;
  suffix?: string;
  useEasing?: boolean;
  numerals?: string[];
}

export interface CommonProps extends CountUpInstanceProps {
  delay?: number | null;
}

export interface CallbackProps {
  onEnd?: OnEndCallback;
  onStart?: OnStartCallback;
  onPauseResume?: OnPauseResumeCallback;
  onReset?: OnResetCallback;
  onUpdate?: OnUpdateCallback;
}

export interface RenderCounterProps {
  countUpRef: React.RefObject<any>;
  start: Function;
  pauseResume: Function;
  reset: Function;
  update: UpdateFn;
}
