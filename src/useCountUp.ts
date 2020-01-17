import { useEffect, useRef } from 'react';
import { CountUp } from 'countup.js';
import { createCountUpInstance } from './common';
import { useCountUpProps } from '../index';
import ReactCountUp from './CountUp';

const useCountUp = (props: useCountUpProps) => {
  const _props = { ...ReactCountUp.defaultProps, ...props };
  const countUpRef = useRef<CountUp | null>(null);

  const createInstance = () => {
    const { ref } = _props;
    const countUp = createCountUpInstance(ref.current, _props);
    // const formattingFnRef = countUp.options.formattingFn;
    // countUp.options.formattingFn = (...args) => formattingFnRef(...args);
    return countUp;
  };

  const getCountUp = () => {
    const countUp = countUpRef.current;
    if (countUp !== null) {
      return countUp;
    }
    const newCountUp = createInstance();
    countUpRef.current = newCountUp;
    return newCountUp;
  };

  const reset = () => {
    const { onReset } = _props;
    getCountUp().reset();
    if (onReset !== undefined) {
      onReset({ pauseResume, start: restart, update });
    }
  };

  const restart = () => {
    const { onStart, onEnd } = _props;
    getCountUp().reset();
    getCountUp().start(() => {
      if (onEnd !== undefined) {
        onEnd({ pauseResume, reset, start: restart, update });
      }
    });
    if (onStart !== undefined) {
      onStart({ pauseResume, reset, update });
    }
  };

  const pauseResume = () => {
    const { onPauseResume } = _props;
    getCountUp().pauseResume();
    if (onPauseResume !== undefined) {
      onPauseResume({ reset, start: restart, update });
    }
  };

  const update = (newEnd?: number) => {
    const { onUpdate } = _props;
    getCountUp().update(newEnd);
    if (onUpdate !== undefined) {
      onUpdate({ pauseResume, reset, start: restart });
    }
  };

  useEffect(() => {
    const { delay, onStart, onEnd, startOnMount } = _props;
    if (startOnMount) {
      const timeout = setTimeout(() => {
        if (onStart !== undefined) {
          onStart({ pauseResume, reset, update });
        }
        getCountUp().start(() => {
          clearTimeout(timeout);
          if (onEnd !== undefined) {
            onEnd({ pauseResume, reset, start: restart, update });
          }
        });
      }, delay * 1000);
    }
    return reset;
  }, []);

  return { start: restart, pauseResume, reset, update };
};

export default useCountUp;
