import * as React from 'react';
import { CountUp as CountUpJs, CountUpOptions } from 'countup.js';

type VoidFn = () => void;
export type UpdateFn = (newEnd: string | number) => void;
export type GetCountUpFn = (recreate?: boolean) => CountUpJs;
export interface CountUpApi {
  start: VoidFn;
  pauseResume: VoidFn;
  reset: VoidFn;
  update: UpdateFn;
  getCountUp: GetCountUpFn;
}

export interface OnEndArgs {
  pauseResume: VoidFn;
  reset: VoidFn;
  start: VoidFn;
  update: UpdateFn;
}
export type OnEndCallback = (args: OnEndArgs) => void;

export interface OnStartArgs {
  pauseResume: VoidFn;
  reset: VoidFn;
  update: UpdateFn;
}
export type OnStartCallback = (args: OnStartArgs) => void;

export interface OnPauseResumeArgs {
  reset: VoidFn;
  start: VoidFn;
  update: UpdateFn;
}
export type OnPauseResumeCallback = (args: OnPauseResumeArgs) => void;

export interface OnResetArgs {
  pauseResume: VoidFn;
  start: VoidFn;
  update: UpdateFn;
}
export type OnResetCallback = (args: OnResetArgs) => void;

export interface OnUpdateArgs {
  pauseResume: VoidFn;
  reset: VoidFn;
  start: VoidFn;
}
export type OnUpdateCallback = (args: OnUpdateArgs) => void;

export interface CountUpInstanceProps extends CountUpOptions {
  decimals?: number;
  end: number;
  start?: number;
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

export interface RenderCounterProps extends CountUpApi {
  countUpRef: React.RefObject<HTMLElement>;
}
