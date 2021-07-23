import { CallbackProps, CommonProps, UpdateFn } from './types';
import { useEffect, useRef } from 'react';
import { createCountUpInstance } from './common';
import { CountUp as CountUpJs } from 'countup.js';

export interface useCountUpProps extends CommonProps, CallbackProps {
  startOnMount?: boolean;
  ref: string | React.RefObject<any>;
}

const defaults: Partial<useCountUpProps> = {
  decimal: '.',
  decimals: 0,
  delay: null,
  onEnd: () => {},
  onPauseResume: () => {},
  onReset: () => {},
  onStart: () => {},
  onUpdate: () => {},
  prefix: '',
  separator: '',
  start: 0,
  startOnMount: true,
  suffix: '',
  useEasing: true,
};

const useCountUp = (props: useCountUpProps) => {
  const parsedProps = { ...defaults, ...props };
  const { ref } = parsedProps;
  const countUpRef = useRef<CountUpJs>();
  const timerRef = useRef<NodeJS.Timeout>();

  const createInstance = () =>
    createCountUpInstance(typeof ref === 'string' ? ref : ref.current, parsedProps);

  const getCountUp = (recreate?: boolean) => {
    const countUp = countUpRef.current;
    if (countUp && !recreate) {
      return countUp;
    }
    const newCountUp = createInstance();
    countUpRef.current = newCountUp;
    return newCountUp;
  };

  const reset = () => {
    const { onReset } = parsedProps;
    getCountUp().reset();
    onReset?.({ pauseResume, start: restart, update });
  };

  const restart = () => {
    const { onStart, onEnd } = parsedProps;
    getCountUp().reset();
    getCountUp().start(() => {
      onEnd?.({ pauseResume, reset, start: restart, update });
    });
    onStart?.({ pauseResume, reset, update });
  };

  const pauseResume = () => {
    const { onPauseResume } = parsedProps;
    getCountUp().pauseResume();
    onPauseResume?.({ reset, start: restart, update });
  };

  const update: UpdateFn = (newEnd) => {
    const { onUpdate } = parsedProps;
    getCountUp().update(newEnd);
    onUpdate?.({ pauseResume, reset, start: restart });
  };

  useEffect(() => {
    const { delay, onStart, onEnd, startOnMount } = parsedProps;
    if (startOnMount) {
      timerRef.current = setTimeout(() => {
        onStart?.({ pauseResume, reset, update });
        getCountUp(true).start(() => {
          timerRef.current && clearTimeout(timerRef.current);
          onEnd?.({ pauseResume, reset, start: restart, update });
        });
      }, delay ? delay * 1000 : 0);
    }
    return () => {
      timerRef.current && clearTimeout(timerRef.current);
      reset();
    };
  }, [parsedProps]);

  return { start: restart, pauseResume, reset, update };
};

export default useCountUp;
