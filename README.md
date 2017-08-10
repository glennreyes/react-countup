# [React CountUp](https://glennreyes.github.io/react-countup)

[![Build Status](https://travis-ci.org/glennreyes/react-countup.svg?branch=master)](https://travis-ci.org/glennreyes/react-countup)
[![Coverage Status](https://coveralls.io/repos/github/glennreyes/react-countup/badge.svg?branch=master)](https://coveralls.io/github/glennreyes/react-countup?branch=master)
[![Dependency Status](https://david-dm.org/glennreyes/react-countup.svg)](https://david-dm.org/glennreyes/react-countup)
[![Dependency Status](https://david-dm.org/glennreyes/react-countup/dev-status.svg)](https://david-dm.org/glennreyes/react-countup#info=devDependencies)
[![npm version](https://badge.fury.io/js/react-countup.svg)](https://badge.fury.io/js/react-countup)


A configurable React component wrapper around [CountUp.js](https://inorganik.github.io/countUp.js/).

![sep -15-2016 10-11-53 pm](https://cloud.githubusercontent.com/assets/5080854/18565869/d23db0e0-7b91-11e6-9ee2-71be5875ca48.gif)


## [Demo](https://glennreyes.github.io/react-countup)

Check out the [demo](https://glennreyes.github.io/react-countup).


## Installation

Make sure you have a compatible version of React `15.x.x` installed in your project.

```bash
yarn add react-countup
```

Alternatively with npm:
```bash
npm install react-countup --save
```


## Usage

#### Simple

```js
import React from 'react';
import { render } from 'react-dom';
import CountUp from 'react-countup';

render(
  <CountUp start={0} end={160526} />,
  document.getElementById('root')
);
```
#### Advanced

```js
import React from 'react';
import { render } from 'react-dom';
import CountUp from 'react-countup';

const onComplete = () => {
  console.log('Completed! 👏');
};

const onStart = () => {
  console.log('Started! 💨');
};

render(
  <CountUp
    className="account-balance"
    start={160527.0127}
    end={-875.0319}
    duration={2.75}
    useEasing={true}
    useGrouping={true}
    separator=" "
    decimals={4}
    decimal=","
    prefix="EUR "
    suffix=" left"
    onComplete={onComplete}
    onStart={onStart}
  />,
  document.getElementById('root'),
);
```

### Props

##### `start`: number
Start value

##### `end`: number
Target value

##### `duration`: number
Duration in seconds

##### `decimals`: number
Amount of decimals

##### `useEasing`: boolean
Enable easing if set to `true` (default easing: `easeOutExpo`)

##### `useGrouping`: boolean
Group thousands by [separator character](#separator-string)

##### `separator`: string
Specifies character of thousands separator

##### `decimal`: string
Specifies decimal character

##### `prefix`: string
Static text before the animating value

##### `suffix`: string
Static text after the animating value

##### `className`: string
CSS class name of the span element

##### `redraw`: boolean
If set to `true`, the CountUp component will always animate on every re-render.

##### `onComplete`: function
Function called after animation has completed

##### `onStart`: function
Function called before animation starts

##### `easingFn`: function
Easing function, see [here for instructions](https://github.com/inorganik/countUp.js#custom-easing)

##### `formattingFn`: function
Function to customize the formatting of the number


## Protips

By default, the animation is triggered if any of the following props has changed:
- `duration`
- `end`
- `start`

You can set `redraw` to `true` If you want your component to always animate on every re-render.

### Manually start the animation

```js
import React, { Component } from 'react';
import CountUp, { startAnimation } from 'react-countup';

const MyComponent = () => (
  <div>
    <CountUp className="CountUp" start={0} end={100} duration={3} ref={(countUp) => {
      this.myCountUp = countUp;
    }} />
    <button className="Button" onClick={(event) => {
      startAnimation(this.myCountUp);
    }}>Count me up!</button>
  </div>
);

export default App;
```

## License
MIT
