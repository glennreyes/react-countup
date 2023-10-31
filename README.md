# [React CountUp](https://tr8tk.csb.app/)

[![GitHub license](https://img.shields.io/npm/l/react-countup.svg?style=flat-square)](https://github.com/glennreyes/react-countup/blob/master/LICENSE)
[![Build Status](https://img.shields.io/travis/glennreyes/react-countup.svg?style=flat-square)](https://travis-ci.org/glennreyes/react-countup)
[![Coverage Status](https://img.shields.io/coveralls/glennreyes/react-countup.svg?style=flat-square)](https://coveralls.io/github/glennreyes/react-countup)
[![Version](https://img.shields.io/npm/v/react-countup.svg?style=flat-square)](https://www.npmjs.com/package/react-countup)
[![Downloads](https://img.shields.io/npm/dm/react-countup.svg?style=flat-square)](http://www.npmtrends.com/react-countup)
[![Gzip size](https://img.badgesize.io/https://unpkg.com/react-countup?style=flat-square&compression=gzip)](https://img.badgesize.io/https://unpkg.com/react-countup)

A configurable React component wrapper around [CountUp.js](https://inorganik.github.io/countUp.js/).

Click [here](https://codesandbox.io/s/github/glennreyes/react-countup/tree/master/demo?fontsize=14&hidenavigation=1&theme=dark&view=preview) to view on CodeSandbox.

### Previous docs

- [v3.x](https://github.com/glennreyes/react-countup/tree/d0002932dac8a274f951e53b1d9b1f4719176147)
- [v4.x](https://github.com/glennreyes/react-countup/tree/afd39ca66a317271ad3135b0a924b86e2982f207)
- [v5.x](https://github.com/glennreyes/react-countup/tree/ae4586c9f502fba726ff2d24d215c88d8f4879d7)

![react-countup](https://user-images.githubusercontent.com/5080854/43985960-0a7fb776-9d0c-11e8-8082-975b1e8bf51c.gif)

## Table of Contents

- [Installation](#installation)
  - [Usage](#usage)
    - [Simple example](#simple-example)
    - [Render prop example](#render-prop-example)
    - [More examples](#more-examples)
      - [Manually start with render prop](#manually-start-with-render-prop)
      - [Autostart with render prop](#autostart-with-render-prop)
      - [Delay start](#delay-start)
      - [Hook](#hook)
  - [API](#api)
    - [Props](#props)
      - [`className: string`](#classname-string)
      - [`decimal: string`](#decimal-string)
      - [`decimals: number`](#decimals-number)
      - [`delay: ?number`](#delay-number)
      - [`duration: number`](#duration-number)
      - [`end: number`](#end-number)
      - [`prefix: string`](#prefix-string)
      - [`redraw: boolean`](#redraw-boolean)
      - [`preserveValue: boolean`](#preservevalue-boolean)
      - [`separator: string`](#separator-string)
      - [`start: number`](#start-number)
      - [`plugin: CountUpPlugin`](#plugin-countupplugin)
      - [`startOnMount: boolean`](#startonmount-boolean)
      - [`suffix: string`](#suffix-string)
      - [`useEasing: boolean`](#useeasing-boolean)
      - [`useGrouping: boolean`](#usegrouping-boolean)
      - [`useIndianSeparators: boolean`](#useindianseparators-boolean)
      - [`easingFn: (t: number, b: number, c: number, d: number) => number`](#easingfn-t-number-b-number-c-number-d-number--number)
      - [`formattingFn: (value: number) => string`](#formattingfn-value-number--string)
      - [`enableScrollSpy: boolean`](#enablescrollspy-boolean)
      - [`scrollSpyDelay: number`](#scrollspydelay-number)
      - [`scrollSpyOnce: boolean`](#scrollspyonce-boolean)
      - [`onEnd: ({ pauseResume, reset, start, update }) => void`](#onend--pauseresume-reset-start-update---void)
      - [`onStart: ({ pauseResume, reset, update }) => void`](#onstart--pauseresume-reset-update---void)
      - [`onPauseResume: ({ reset, start, update }) => void`](#onpauseresume--reset-start-update---void)
      - [`onReset: ({ pauseResume, start, update }) => void`](#onreset--pauseresume-start-update---void)
      - [`onUpdate: ({ pauseResume, reset, start }) => void`](#onupdate--pauseresume-reset-start---void)
    - [Render props](#render-props)
      - [`countUpRef: () => void`](#countupref---void)
      - [`pauseResume: () => void`](#pauseresume---void)
      - [`reset: () => void`](#reset---void)
      - [`start: () => void`](#start---void)
      - [`update: (newEnd: number?) => void`](#update-newend-number--void)
  - [Protips](#protips)
    - [Trigger of transition](#trigger-of-transition)
    - [Run if in focus](#run-if-in-focus)
    - [Set accessibility properties for occupation period](#set-accessibility-properties-for-occupation-period)
  - [License](#license)

## Installation

```bash
yarn add react-countup
```

## Usage

```js
import CountUp from 'react-countup';
```

### Simple example

```js
<CountUp end={100} />
```

This will start a count up transition from `0` to `100` on render.

### Render prop example

```js
<CountUp
  start={-875.039}
  end={160527.012}
  duration={2.75}
  separator=" "
  decimals={4}
  decimal=","
  prefix="EUR "
  suffix=" left"
  onEnd={() => console.log('Ended! 👏')}
  onStart={() => console.log('Started! 💨')}
>
  {({ countUpRef, start }) => (
    <div>
      <span ref={countUpRef} />
      <button onClick={start}>Start</button>
    </div>
  )}
</CountUp>
```

The transition won't start on initial render as it needs to be triggered manually here.

> Tip: If you need to start the render prop component immediately, you can set delay={0}.

### More examples

#### Manually start with render prop

```js
<CountUp start={0} end={100}>
  {({ countUpRef, start }) => (
    <div>
      <span ref={countUpRef} />
      <button onClick={start}>Start</button>
    </div>
  )}
</CountUp>
```

#### Autostart with render prop

Render start value but start transition on first render:

```js
<CountUp start={0} end={100} delay={0}>
  {({ countUpRef }) => (
    <div>
      <span ref={countUpRef} />
    </div>
  )}
</CountUp>
```

Note that `delay={0}` will automatically start the count up.

#### Delay start

```js
<CountUp delay={2} end={100} />
```

### Hook

#### Simple example

```js
import { useCountUp } from 'react-countup';

const SimpleHook = () => {
  useCountUp({ ref: 'counter', end: 1234567 });
  return <span id="counter" />;
};
```

#### Complete example

```js
import { useCountUp } from 'react-countup';

const CompleteHook = () => {
  const countUpRef = React.useRef(null);
  const { start, pauseResume, reset, update } = useCountUp({
    ref: countUpRef,
    start: 0,
    end: 1234567,
    delay: 1000,
    duration: 5,
    onReset: () => console.log('Resetted!'),
    onUpdate: () => console.log('Updated!'),
    onPauseResume: () => console.log('Paused or resumed!'),
    onStart: ({ pauseResume }) => console.log(pauseResume),
    onEnd: ({ pauseResume }) => console.log(pauseResume),
  });
  return (
    <div>
      <div ref={countUpRef} />
      <button onClick={start}>Start</button>
      <button onClick={reset}>Reset</button>
      <button onClick={pauseResume}>Pause/Resume</button>
      <button onClick={() => update(2000)}>Update to 2000</button>
    </div>
  );
};
```

## API

### Props

#### `className: string`

CSS class name of the span element.

> Note: This won't be applied when using CountUp with render props.

#### `decimal: string`

Specifies decimal character.

Default: `.`

#### `decimals: number`

Amount of decimals to display.

Default: `0`

#### `delay: number`

Delay in seconds before starting the transition.

Default: `null`

> Note: `delay={0}` will automatically start the count up.

#### `duration: number`

Duration in seconds.

Default: `2`

#### `end: number`

Target value.

#### `prefix: string`

Static text before the transitioning value.

#### `redraw: boolean`

Forces count up transition on every component update.

Default: `false`

#### `preserveValue: boolean`

Save previously ended number to start every new animation from it.

Default: `false`

#### `separator: string`

Specifies character of thousands separator.

#### `start: number`

Initial value.

Default: `0`

#### `plugin: CountUpPlugin`

Define plugin for alternate animations

#### `startOnMount: boolean`

Use for start counter on mount for hook usage.

Default: `true`

#### `suffix: string`

Static text after the transitioning value.

#### `useEasing: boolean`

Enables easing. Set to `false` for a linear transition.

Default: `true`

#### `useGrouping: boolean`

Enables grouping with [separator](#separator-string).

Default: `true`

#### `useIndianSeparators: boolean`

Enables grouping using indian separation, f.e. 1,00,000 vs 100,000

Default: `false`

#### `easingFn: (t: number, b: number, c: number, d: number) => number`

Easing function. Click [here](http://robertpenner.com/easing) for more details.

Default: [`easeInExpo`](https://github.com/inorganik/countUp.js/blob/master/countUp.js#L103-L106)

#### `formattingFn: (value: number) => string`

Function to customize the formatting of the number.

To prevent component from unnecessary updates this function should be memoized with [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback)

#### `enableScrollSpy: boolean`

Enables start animation when target is in view.

#### `scrollSpyDelay: number`

Delay (ms) after target comes into view

#### `scrollSpyOnce: boolean`

Run scroll spy only once

#### `onEnd: ({ pauseResume, reset, start, update }) => void`

Callback function on transition end.

#### `onStart: ({ pauseResume, reset, update }) => void`

Callback function on transition start.

#### `onPauseResume: ({ reset, start, update }) => void`

Callback function on pause or resume.

#### `onReset: ({ pauseResume, start, update }) => void`

Callback function on reset.

#### `onUpdate: ({ pauseResume, reset, start }) => void`

Callback function on update.

### Render props

#### `countUpRef: () => void`

Ref to hook the countUp instance to

#### `pauseResume: () => void`

Pauses or resumes the transition

#### `reset: () => void`

Resets to initial value

#### `start: () => void`

Starts or restarts the transition

#### `update: (newEnd: number?) => void`

Updates transition to the new end value (if given)

## Protips

### Trigger of transition

By default, the animation is triggered if any of the following props has changed:

- `duration`
- `end`
- `start`

If `redraw` is set to `true` your component will start the transition on every component update.

### Run if in focus

You need to check if your counter in viewport, [react-visibility-sensor](https://github.com/joshwnj/react-visibility-sensor) can be used for this purpose.

```js
import React from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import './styles.css';

export default function App() {
  return (
    <div className="App">
      <div className="content" />
      <VisibilitySensor partialVisibility offset={{ bottom: 200 }}>
        {({ isVisible }) => (
          <div style={{ height: 100 }}>
            {isVisible ? <CountUp end={1000} /> : null}
          </div>
        )}
      </VisibilitySensor>
    </div>
  );
}
```

> Note: For latest **react-countup** releases there are new options [`enableScrollSpy`](#enablescrollspy-boolean) and [`scrollSpyDelay`](#scrollspydelay-number) which enable scroll spy, so that as user scrolls to the target element, it begins counting animation automatically once it has scrolled into view.

```js
import './styles.css';
import CountUp, { useCountUp } from 'react-countup';

export default function App() {
  useCountUp({
    ref: 'counter',
    end: 1234567,
    enableScrollSpy: true,
    scrollSpyDelay: 1000,
  });

  return (
    <div className="App">
      <div className="content" />
      <CountUp end={100} enableScrollSpy />
      <br />
      <span id="counter" />
    </div>
  );
}
```

### Set accessibility properties for occupation period

You can use callback properties to control accessibility:

```js
import React from 'react';
import CountUp, { useCountUp } from 'react-countup';

export default function App() {
  useCountUp({ ref: 'counter', end: 10, duration: 2 });
  const [loading, setLoading] = React.useState(false);

  const onStart = () => {
    setLoading(true);
  };

  const onEnd = () => {
    setLoading(false);
  };

  const containerProps = {
    'aria-busy': loading,
  };

  return (
    <>
      <CountUp
        end={123457}
        duration="3"
        onStart={onStart}
        onEnd={onEnd}
        containerProps={containerProps}
      />
      <div id="counter" aria-busy={loading} />
    </>
  );
}
```

### Plugin usage

```js
import { CountUp } from 'countup.js';
import { Odometer } from 'odometer_countup';

export default function App() {
  useCountUp({
    ref: 'counter',
    end: 1234567,
    enableScrollSpy: true,
    scrollSpyDelay: 1000,
    plugin: Odometer,
  });

  return (
    <div className="App">
      <span id="counter" />
    </div>
  );
}
```

## License

MIT
