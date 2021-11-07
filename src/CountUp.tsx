import React, {
  CSSProperties,
  ReactNode,
  ComponentPropsWithoutRef,
  useEffect,
} from 'react';
import { CallbackProps, CommonProps, RenderCounterProps } from './types';
import { useEventCallback } from './helpers/useEventCallback';
import useCountUp from './useCountUp';

export interface CountUpProps extends CommonProps, CallbackProps {
  className?: string;
  redraw?: boolean;
  children?: (props: RenderCounterProps) => ReactNode;
  style?: CSSProperties;
  preserveValue?: boolean;
  containerProps?: ComponentPropsWithoutRef<'span'>;
}

const CountUp: React.FC<CountUpProps> = (props) => {
  const {
    className,
    redraw,
    containerProps,
    children,
    style,
    ...useCountUpProps
  } = props;
  const containerRef = React.useRef<HTMLElement>(null);
  const isInitializedRef = React.useRef(false);

  const {
    start,
    reset,
    update: updateCountUp,
    pauseResume,
    getCountUp,
  } = useCountUp({
    ...useCountUpProps,
    ref: containerRef,
    startOnMount: typeof children !== 'function' || props.delay === 0,
    // component manually restarts
    enableReinitialize: false,
  });

  const restart = useEventCallback(() => {
    start();
  });

  const update = useEventCallback((end: string | number) => {
    if (!props.preserveValue) {
      reset();
    }
    updateCountUp(end);
  });

  const initializeOnMount = useEventCallback(() => {
    if (typeof props.children === 'function') {
      // Warn when user didn't use containerRef at all
      if (!(containerRef.current instanceof Element)) {
        console.error(
          `Couldn't find attached element to hook the CountUp instance into! Try to attach "containerRef" from the render prop to a an Element, eg. <span ref={containerRef} />.`,
        );
        return;
      }
    }

    // unlike the hook, the CountUp component initializes on mount
    getCountUp();
  });

  useEffect(() => {
    initializeOnMount();
  }, [initializeOnMount]);

  useEffect(() => {
    if (isInitializedRef.current) {
      update(props.end);
    }
  }, [props.end, update]);

  const redrawDependencies = redraw && props;

  // if props.redraw, call this effect on every props change
  useEffect(() => {
    if (redraw && isInitializedRef.current) {
      restart();
    }
  }, [restart, redraw, redrawDependencies]);

  // if not props.redraw, call this effect only when certain props are changed
  useEffect(() => {
    if (!redraw && isInitializedRef.current) {
      restart();
    }
  }, [
    restart,
    redraw,
    props.start,
    props.suffix,
    props.prefix,
    props.duration,
    props.separator,
    props.decimals,
    props.decimal,
    props.className,
    props.formattingFn,
  ]);

  useEffect(() => {
    isInitializedRef.current = true;
  }, []);

  if (typeof children === 'function') {
    // TypeScript forces functional components to return JSX.Element | null.
    return children({
      countUpRef: containerRef,
      start,
      reset,
      update: updateCountUp,
      pauseResume,
      getCountUp,
    }) as JSX.Element | null;
  }

  return (
    <span
      className={className}
      ref={containerRef}
      style={style}
      {...containerProps}
    >
      {props.start ? getCountUp().formattingFn(props.start) : ''}
    </span>
  );
};

export default CountUp;
