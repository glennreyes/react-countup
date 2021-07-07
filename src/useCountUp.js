import { useEffect, useRef } from 'react';
import CountUp from './CountUp';
import { createCountUpInstance } from './common';

const useCountUp = (props) => {
  const _props = { ...CountUp.defaultProps, ...props };
  const { ref } = _props;
  const countUpRef = useRef(null);
  const timerRef = useRef(null);

  const createInstance = () =>
    createCountUpInstance(typeof ref === 'string' ? ref : ref.current, _props);

  const getCountUp = (recreate) => {
    const countUp = countUpRef.current;
    if (countUp !== null && !recreate) {
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

  const update = (newEnd) => {
    const { onUpdate } = _props;
    getCountUp().update(newEnd);
    onUpdate({ pauseResume, reset, start: restart });
  };

  useEffect(() => {
    const { delay, onStart, onEnd, startOnMount } = _props;
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
  }, [_props]);

  return { start: restart, pauseResume, reset, update };
};

export default useCountUp;
