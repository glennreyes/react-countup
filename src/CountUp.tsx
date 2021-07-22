import React, { CSSProperties, useEffect } from 'react';
import warning from 'warning';
import { createCountUpInstance } from './common';
import { CountUp as CountUpJs } from 'countup.js';
import { CallbackProps, CommonProps, RenderCounterProps } from './types';
import { useEventCallback } from './helpers/useEventCallback';

export interface CountUpProps extends CommonProps, CallbackProps {
  className?: string;
  redraw?: boolean;
  preserveValue?: boolean;
  children?: (props: RenderCounterProps) => JSX.Element | null;
  style: CSSProperties;
}

const CountUp: React.FC<CountUpProps> = (props) => {
  const instance = React.useRef<CountUpJs | undefined>();
  const timeoutId = React.useRef<NodeJS.Timeout | undefined>();
  const containerRef = React.createRef<any>();

  const createInstance = () => {
    if (typeof props.children === 'function') {
      // Warn when user didn't use containerRef at all
      warning(
        containerRef.current &&
          (containerRef.current instanceof HTMLElement ||
            containerRef.current instanceof SVGTextElement ||
            containerRef.current instanceof SVGTSpanElement),
        `Couldn't find attached element to hook the CountUp instance into! Try to attach "containerRef" from the render prop to a an HTMLElement, eg. <span ref={containerRef} />.`,
      );
    }
    return createCountUpInstance(containerRef.current, props);
  };

  const pauseResume = useEventCallback(() => {
    const { onPauseResume } = props;

    instance.current.pauseResume();

    onPauseResume({ reset, start, update });
  });

  const reset = useEventCallback(() => {
    const { onReset } = props;

    instance.current.reset();

    onReset({ pauseResume, start: restart, update });
  });

  const restart = useEventCallback(() => {
    reset();
    start();
  });

  const start = useEventCallback(() => {
    const { delay, onEnd, onStart } = props;
    const run = () =>
      instance.current.start(() => onEnd({ pauseResume, reset, start, update }));

    // Delay start if delay prop is properly set
    if (delay > 0) {
      timeoutId.current = setTimeout(run, delay * 1000);
    } else {
      run();
    }

    onStart({ pauseResume, reset, update });
  });

  const update = useEventCallback((newEnd) => {
    const { onUpdate } = props;

    instance.current.update(newEnd);

    onUpdate({ pauseResume, reset, start: restart });
  });

  const reinitialize = useEventCallback(() => {
    instance.current.reset();
    instance.current = createInstance();
    start();
  });

  const updateEnd = useEventCallback((end: number) => {
    // Only end value has changed, so reset and and re-animate with the updated
    // end value.
    if (!props.preserveValue) {
      instance.current.reset();
    }
    instance.current.update(end);
  });

  // if props.redraw, call this effect on every props change
  useEffect(() => {
    if (props.redraw) {
      reinitialize();
    }
  }, [props.redraw && props]);

  // if not props.redraw, call this effect only when certain props are changed
  useEffect(() => {
    if (!props.redraw) {
      reinitialize();
    }
  }, [
    props.redraw,
    props.start,
    props.suffix,
    props.prefix,
    props.duration,
    props.separator,
    props.decimals,
    props.decimal,
    props.className,
    props.formattingFn
  ]);

  useEffect(() => {
    const { children, delay } = props;
    instance.current = createInstance();

    // Don't invoke start if component is used as a render prop
    if (typeof children === 'function' && delay !== 0) return;

    // Otherwise just start immediately
    start();

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      // instance.target is incorrectly marked private by typescript
      if ((instance.current as any).target) {
        instance.current.reset();
      }
    }
  }, []);

  useEffect(() => {
    updateEnd(props.end);
  }, [props.end]);

  const { children, className, style } = props;

  if (typeof children === 'function') {
    return children({
      countUpRef: containerRef,
      pauseResume,
      reset,
      start: restart,
      update,
    });
  }

  return <span className={className} ref={containerRef} style={style} />;
}

export default CountUp;
