# React CountUp

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package]
[![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]
[![gzip size](https://img.badgesize.io/https://unpkg.com/react-countup?compression=gzip)](https://img.badgesize.io/https://unpkg.com/react-countup)

A configurable React component wrapper around [CountUp.js](https://inorganik.github.io/countUp.js/).

## Table of Contents

- [Installation](#installation)
  - [Usage](#usage)
    - [Simple example](#simple-example)
    - [Advanced example](#render-prop-example)
    - [More examples](#more-examples)
      - [Manually start](#manually-start)
      - [Delay start](#delay-start)
  - [API](#api)
    - [Props](#props)
      - [`autostart: number`](#autostart-number)
      - [`className: string`](#classname-string)
      - [`decimal: string`](#decimal-string)
      - [`decimals: number`](#decimals-number)
      - [`delay: number`](#delay-number)
      - [`duration: number`](#duration-number)
      - [`end: number`](#end-number)
      - [`prefix: string`](#prefix-string)
      - [`redraw: boolean`](#redraw-boolean)
      - [`separator: string`](#separator-string)
      - [`start: number`](#start-number)
      - [`suffix: string`](#suffix-string)
      - [`useEasing: boolean`](#useeasing-boolean)
      - [`easingFn: (t: number, b: number, c: number, d: number) => number`](#easingfn-t-number-b-number-c-number-d-number--number)
      - [`formattingFn: (value: number) => string`](#formattingfn-value-number--string)
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
<CountUp end={160526} />
```

### Render prop example

```js
<CountUp
  className="account-balance"
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
      <div ref={countUpRef} />
      <button onClick={start} />
    </div>
  )}
</CountUp>
```

### More examples

#### Manually start

Render start value but don't initially start transition:

```js
<CountUp end={100}>
  {({ countUpref, start }) => (
    <div>
      <span ref={countUpRef} />
      <button onClick={start}>Start</button>
    </div>
  )}
</CountUp>
```

Render start value and start transition:

```js
<CountUp autostart end={100}>
  {({ countUpref, start }) => (
    <div>
      <span ref={countUpRef} />
      <button onClick={start}>Start</button>
    </div>
  )}
</CountUp>
```

#### Delay start

```js
<CountUp delay={5} end={100} />
```

## API

### Props

#### `autostart: number`

By default the transition will start automatically.

However, if this is used as a [render prop component](#render-prop-example), the transition will
automatically on initial render.

Default: `false`

> Note: Alternatively, you can also set `delay={0}` instead to automatically start the count up.

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

#### `separator: string`

Specifies character of thousands separator.

#### `start: number`

Initial value.

Default: `0`

#### `suffix: string`

Static text after the transitioning value.

#### `useEasing: boolean`

Enables easing. Set to `false` for a linear transition.

Default: `true`

#### `easingFn: (t: number, b: number, c: number, d: number) => number`

Easing function. Click [here](http://robertpenner.com/easing) for more details.

Default: [`easeInExpo`](https://github.com/inorganik/countUp.js/blob/master/countUp.js#L103-L106)

#### `formattingFn: (value: number) => string`

Function to customize the formatting of the number

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

By default, the animation is triggered if any of the following props has changed:

- `duration`
- `end`
- `start`

If `redraw` is set to `true` your component will start the transition on every component update.

## License

MIT
