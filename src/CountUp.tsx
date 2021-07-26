import React, { CSSProperties, useEffect } from 'react';
import warning from 'warning';
import { CallbackProps, CommonProps, RenderCounterProps } from './types';
import { useEventCallback } from './helpers/useEventCallback';
import useCountUp from './useCountUp';

export interface CountUpProps extends CommonProps, CallbackProps {
  className?: string;
  redraw?: boolean;
  children?: (props: RenderCounterProps) => React.ReactNode;
  style?: CSSProperties;
  preserveValue?: boolean;
}

const CountUp = (props: CountUpProps) => {
  const { className, redraw, children, style, ...useCountUpProps } = props;
  const containerRef = React.useRef<any>(null);
  const isInitializedRef = React.useRef(false);

  const countUp = useCountUp({
    ...useCountUpProps,
    ref: containerRef,
    startOnMount: typeof children !== 'function' || props.delay === 0,
    // component manually restarts
    enableReinitialize: false,
  });

  const restart = useEventCallback(() => {
    countUp.start();
  });

  const update = useEventCallback((end: string | number) => {
    if (!props.preserveValue) {
      countUp.reset();
    }
    countUp.update(end);
  });

  useEffect(() => {
    // unlike the hook, the CountUp component initializes on mount
    countUp.getCountUp();

    if (typeof props.children === 'function') {
      // Warn when user didn't use containerRef at all
      warning(
        containerRef.current instanceof Element,
        `Couldn't find attached element to hook the CountUp instance into! Try to attach "containerRef" from the render prop to a an HTMLElement, eg. <span ref={containerRef} />.`,
      );
    }
  }, []);

  useEffect(() => {
    if (isInitializedRef.current) {
      update(props.end);
    }
  }, [props.end]);

  // if props.redraw, call this effect on every props change
  useEffect(() => {
    if (props.redraw && isInitializedRef.current) {
      restart();
    }
  }, [props.redraw && props]);

  // if not props.redraw, call this effect only when certain props are changed
  useEffect(() => {
    if (!props.redraw && isInitializedRef.current) {
      restart();
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
    isInitializedRef.current = true;
  }, []);

  if (typeof children === 'function') {
    // TypeScript forces functional components to return JSX.Element | null.
    return children({
      countUpRef: containerRef,
      ...countUp,
    }) as JSX.Element | null;
  }

  return <span className={className} ref={containerRef} style={style} />;
}

export default CountUp;
