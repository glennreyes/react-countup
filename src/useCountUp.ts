import { CallbackProps, CommonProps, UpdateFn } from './types';
import { useMemo, useRef, useEffect } from 'react';
import { createCountUpInstance } from './common';
import { useEventCallback } from './helpers/useEventCallback';
import { CountUp as CountUpJs } from 'countup.js';

export interface useCountUpProps extends CommonProps, CallbackProps {
  startOnMount?: boolean;
  ref: string | React.MutableRefObject<any>;
  enableReinitialize?: boolean;
}

const defaults: Partial<useCountUpProps> = {
  decimal: '.',
  decimals: 0,
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
  enableReinitialize: true,
};

const useCountUp = (props: useCountUpProps) => {
  const config = useMemo<useCountUpProps>(() => ({ ...defaults, ...props }), [props]);
  const { ref } = config;
  const countUpRef = useRef<CountUpJs>();
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const isInitializedRef = useRef(false);

  const createInstance = useEventCallback(() => {
    return createCountUpInstance(
      typeof ref === 'string' ? ref : ref.current,
      config
    )
  });

  const getCountUp = useEventCallback((recreate?: boolean) => {
    const countUp = countUpRef.current;
    if (countUp && !recreate) {
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
        onEnd?.({ pauseResume, reset, start: restart, update });
      });

    if (delay && delay > 0) {
      timerRef.current = setTimeout(run, delay * 1000);
    } else {
      run();
    }

    onStart?.({ pauseResume, reset, update });
  });

  const pauseResume = useEventCallback(() => {
    const { onPauseResume } = config;

    getCountUp().pauseResume();

    onPauseResume?.({ reset, start: restart, update });
  });

  const reset = useEventCallback(() => {
    timerRef.current && clearTimeout(timerRef.current);

    const { onReset } = config;

    getCountUp().reset();

    onReset?.({ pauseResume, start: restart, update });
  });

  const update: UpdateFn = useEventCallback((newEnd) => {
    const { onUpdate } = config;

    getCountUp().update(newEnd);

    onUpdate?.({ pauseResume, reset, start: restart });
  });

  const restart = useEventCallback(() => {
    reset();
    start();
  });

  const maybeInitialize = useEventCallback(() => {
    if (config.startOnMount) {
      start();
    }
  });

  const maybeReinitialize = () => {
    if (config.startOnMount) {
      reset();
      start();
    }
  }

  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;

      maybeInitialize();
    } else if (config.enableReinitialize) {
      maybeReinitialize();
    }
  }, [maybeInitialize, reset, config]);

  useEffect(() => {
    return () => {
      reset();
    }
  }, []);

  return { start: restart, pauseResume, reset, update, getCountUp };
};

export default useCountUp;
