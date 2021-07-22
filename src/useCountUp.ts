import { CallbackProps, CommonProps, UpdateFn } from './types';
import { useMemo, useRef, useEffect } from 'react';
import { createCountUpInstance } from './common';
import { useEventCallback } from './helpers/useEventCallback';

export interface useCountUpProps extends CommonProps, CallbackProps {
  startOnMount?: boolean;
  ref?: string | React.MutableRefObject<any>;
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
  separator: '',
  start: 0,
  startOnMount: true,
  suffix: '',
  style: undefined,
  useEasing: true,
};

const useCountUp = (props: useCountUpProps) => {
  const config = useMemo(() => ({ ...defaults, ...props }), [props]);
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
    clearTimeout(timerRef.current);
    const countUp = getCountUp(true);

    const { delay, onStart, onEnd } = config;

    const run = () =>
      countUp.start(() => {
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

  const initialize = useEventCallback(() => {
    // populate initial instance on mount
    getCountUp();

    if (config.startOnMount) {
      start();
    }
  });

  useEffect(() => {
    initialize();

    return () => {
      clearTimeout(timerRef.current);
      reset();
    };
  }, [initialize, reset, config]);

  return { start: restart, pauseResume, reset, update };
};

export default useCountUp;
