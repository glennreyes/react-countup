import { useEffect, useRef } from 'react';
import { CountUp } from 'countup.js';
import { createCountUpInstance } from './common';
import { useCountUpProps } from '../index';
import ReactCountUp from './CountUp';

const defaultProps = {
  startOnMount: true,
};

const useCountUp = (props: useCountUpProps) => {
  const _props = { ...ReactCountUp.defaultProps, ...defaultProps, ...props };
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
    onReset?.({ pauseResume, start: restart, update });
  };

  const restart = () => {
    const { onStart, onEnd } = _props;
    getCountUp().reset();
    getCountUp().start(() => {
      onEnd?.({ pauseResume, reset, start: restart, update });
    });
    onStart?.({ pauseResume, reset, update });
  };

  const pauseResume = () => {
    const { onPauseResume } = _props;
    getCountUp().pauseResume();
    onPauseResume?.({ reset, start: restart, update });
  };

  const update = (newEnd?: string | number) => {
    const { onUpdate } = _props;
    getCountUp().update(newEnd);
    onUpdate?.({ pauseResume, reset, start: restart });
  };

  useEffect(() => {
    const { delay, onStart, onEnd, startOnMount } = _props;
    if (startOnMount) {
      const timeout = setTimeout(
        () => {
          onStart?.({ pauseResume, reset, update });
          getCountUp().start(() => {
            clearTimeout(timeout);
            onEnd?.({ pauseResume, reset, start: restart, update });
          });
        },
        delay ? delay * 1000 : 0,
      );
    }
    return reset;
  }, []);

  return { start: restart, pauseResume, reset, update };
};

export default useCountUp;
