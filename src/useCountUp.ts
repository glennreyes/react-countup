import { useEffect, useRef } from 'react';
import CountUp from './CountUp';
import { createCountUpInstance } from './common';

const useCountUp = props => {
  const _props = { ...CountUp.defaultProps, ...props };
  const countUpRef = useRef(null);

  const createInstance = () => {
    const { ref } = _props;
    const countUp = createCountUpInstance(ref.current, _props);
    let formattingFnRef = countUp.options.formattingFn;
    countUp.options.formattingFn = (...args) => formattingFnRef(...args);
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
    onReset({ pauseResume, start: restart, update });
  };

  const restart = () => {
    const { onStart, onEnd } = _props;
    getCountUp().reset();
    getCountUp().start(() => {
      onEnd({ pauseResume, reset, start: restart, update });
    });
    onStart({ pauseResume, reset, update });
  };

  const pauseResume = () => {
    const { onPauseResume } = _props;
    getCountUp().pauseResume();
    onPauseResume({ reset, start: restart, update });
  };

  const update = newEnd => {
    const { onUpdate } = _props;
    getCountUp().update(newEnd);
    onUpdate({ pauseResume, reset, start: restart });
  };

  useEffect(() => {
    const { delay, onStart, onEnd, startOnMount } = _props;
    if (startOnMount) {
      const timeout = setTimeout(() => {
        onStart({ pauseResume, reset, update });
        getCountUp().start(() => {
          clearTimeout(timeout);
          onEnd({ pauseResume, reset, start: restart, update });
        });
      }, delay * 1000);
    }
    return reset;
  }, []);

  return { start: restart, pauseResume, reset, update };
};

export default useCountUp;
