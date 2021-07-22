import { CallbackProps, CommonProps, UpdateFn } from './types';
import { useEffect, useRef } from 'react';
import { createCountUpInstance } from './common';

export interface useCountUpProps extends CommonProps, CallbackProps {
  startOnMount?: boolean;
  ref?: string | React.RefObject<any>;
}

const defaults = {
  decimal: '.',
  decimals: 0,
  delay: null,
  duration: null,
  easingFn: null,
  formattingFn: null,
  onEnd: () => {},
  onPauseResume: () => {},
  onReset: () => {},
  onStart: () => {},
  onUpdate: () => {},
  prefix: '',
  redraw: false,
  separator: '',
  start: 0,
  startOnMount: true,
  suffix: '',
  style: undefined,
  useEasing: true,
  preserveValue: false,
};

const useCountUp = (props: useCountUpProps) => {
  const parsedProps = { ...defaults, ...props };
  const { ref } = parsedProps;
  const countUpRef = useRef(null);
  const timerRef = useRef(null);

  const createInstance = () =>
    createCountUpInstance(typeof ref === 'string' ? ref : ref.current, parsedProps);

  const getCountUp = (recreate?: boolean) => {
    const countUp = countUpRef.current;
    if (countUp !== null && !recreate) {
      return countUp;
    }
    const newCountUp = createInstance();
    countUpRef.current = newCountUp;
    return newCountUp;
  };

  const reset = () => {
    const { onReset } = parsedProps;
    getCountUp().reset();
    onReset({ pauseResume, start: restart, update });
  };

  const restart = () => {
    const { onStart, onEnd } = parsedProps;
    getCountUp().reset();
    getCountUp().start(() => {
      onEnd({ pauseResume, reset, start: restart, update });
    });
    onStart({ pauseResume, reset, update });
  };

  const pauseResume = () => {
    const { onPauseResume } = parsedProps;
    getCountUp().pauseResume();
    onPauseResume({ reset, start: restart, update });
  };

  const update: UpdateFn = (newEnd) => {
    const { onUpdate } = parsedProps;
    getCountUp().update(newEnd);
    onUpdate({ pauseResume, reset, start: restart });
  };

  useEffect(() => {
    const { delay, onStart, onEnd, startOnMount } = parsedProps;
    if (startOnMount) {
      timerRef.current = setTimeout(() => {
        onStart({ pauseResume, reset, update });
        getCountUp(true).start(() => {
          clearTimeout(timerRef.current);
          onEnd({ pauseResume, reset, start: restart, update });
        });
      }, delay * 1000);
    }
    return () => {
      clearTimeout(timerRef.current);
      reset();
    };
  }, [parsedProps]);

  return { start: restart, pauseResume, reset, update };
};

export default useCountUp;
