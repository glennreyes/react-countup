# [React CountUp](https://glennreyes.github.io/react-countup)

[![Greenkeeper badge](https://badges.greenkeeper.io/glennreyes/react-countup.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/glennreyes/react-countup.svg?branch=master)](https://travis-ci.org/glennreyes/react-countup)
[![Coverage Status](https://coveralls.io/repos/github/glennreyes/react-countup/badge.svg?branch=master)](https://coveralls.io/github/glennreyes/react-countup?branch=master)
[![Dependency Status](https://david-dm.org/glennreyes/react-countup.svg)](https://david-dm.org/glennreyes/react-countup)
[![Dependency Status](https://david-dm.org/glennreyes/react-countup/dev-status.svg)](https://david-dm.org/glennreyes/react-countup#info=devDependencies)
[![npm version](https://badge.fury.io/js/react-countup.svg)](https://badge.fury.io/js/react-countup)


A configurable React component wrapper around [CountUp.js](https://inorganik.github.io/countUp.js/) to count up numbers.

![sep -15-2016 10-11-53 pm](https://cloud.githubusercontent.com/assets/5080854/18565869/d23db0e0-7b91-11e6-9ee2-71be5875ca48.gif)

## [Demo](https://glennreyes.github.io/react-countup)
Check out the [live demo](https://glennreyes.github.io/react-countup).


## Installation
Make sure you have a compatible version of and `15.x.x` installed in your project.
```bash
npm install react-countup --save
```

## Usage
#### Basic
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
    className="custom-count"
    start={160527.0127}
    end={-875}
    duration={2.75}
    useEasing={true}
    separator=" "
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
The start number from which the should start from

##### `end`: number
Target number to count up

##### `duration`: number
Duration of count up animation in seconds

##### `decimals`: number
Amount of decimals

##### `useEasing`: boolean
Use "easeOutExpo" if `true`

##### `useGrouping`: boolean
Group thousands by separator character

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
If `true`, your component will always animate on every re-render.

##### `onComplete`: function
Method called after animation has completed

##### `onStart`: function
Method called before animation starts

##### `easingFn`: function
Method to customize easing the function. See also [here](https://github.com/inorganik/countUp.js#custom-easing)

##### `formattingFn`: function
Method to customize the formatting of the number

## Advanced Usage
By default, the animation triggered if any of the follow props has changed:
- `duration`
- `end`
- `start`

You can set `redraw` to `true` If you want your component to always animate on every re-render.

### Start animation manually

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
    }}>Animate me!</button>
  </div>
);

export default App;
```

## License
MIT
