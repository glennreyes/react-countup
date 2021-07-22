import { CallbackProps, CommonProps, UpdateFn } from './types';
import { useEffect, useRef } from 'react';
import { createCountUpInstance } from './common';
import { useEventCallback } from './helpers/useEventCallback';

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
};

const useCountUp = (props: useCountUpProps) => {
  const config = { ...defaults, ...props };
  const { ref } = config;
  const countUpRef = useRef(null);
  const timerRef = useRef(null);

  const createInstance = useEventCallback(() => {
    return createCountUpInstance(
      typeof ref === 'string' ? ref : ref.current,
      config
    )
  });

  const getCountUp = useEventCallback((recreate?: boolean) => {
    const countUp = countUpRef.current;
    if (countUp !== null && !recreate) {
      return countUp;
    }
    const newCountUp = createInstance();
    countUpRef.current = newCountUp;
    return newCountUp;
  });

  const start = useEventCallback(() => {
    const { delay, onStart, onEnd } = config;

    const run = () =>
      getCountUp(true).start(() => {
        clearTimeout(timerRef.current);
        onEnd({ pauseResume, reset, start: restart, update });
      });

    if (delay > 0) {
      timerRef.current = setTimeout(run, delay * 1000);
    } else {
      run();
    }

    onStart({ pauseResume, reset, update });
  });

  const pauseResume = useEventCallback(() => {
    const { onPauseResume } = config;

    getCountUp().pauseResume();

    onPauseResume({ reset, start: restart, update });
  });

  const reset = useEventCallback(() => {
    const { onReset } = config;

    getCountUp().reset();

    onReset({ pauseResume, start: restart, update });
  });

  const update: UpdateFn = useEventCallback((newEnd) => {
    const { onUpdate } = config;

    getCountUp().update(newEnd);

    onUpdate({ pauseResume, reset, start: restart });
  });

  const restart = useEventCallback(() => {
    reset();
    start();
  });

  const maybeStartOnMount = useEventCallback(() => {
    const { startOnMount } = config;
    if (startOnMount) {
      start();
    }
  });

  useEffect(() => {
    maybeStartOnMount();

    return () => {
      clearTimeout(timerRef.current);
      reset();
    };
  }, [maybeStartOnMount, reset]);

  return { start: restart, pauseResume, reset, restart, update };
};

export default useCountUp;
