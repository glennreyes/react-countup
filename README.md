# [React CountUp](https://glennreyes.github.io/react-countup)

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
Make sure you have a compatible version of `React 0.14.x` and `15.x.x` installed in your project.
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
  // Do something on completion
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
    callback={onComplete}
  />,
  document.getElementById('root'),
);
```

### Props

##### `start` *{number}*
The start number from which the should start from

##### `end` *{number}*
Target number to count up

##### `duration` in s *{number}*
Duration of count up animation

##### `decimals` *{number}*
Amount of decimals

##### `useEasing` *{boolean}*
Use "easeOutExpo" if `true`

##### `useGrouping` *{boolean}*
Group thousands by separator character

##### `separator` *{string}*
Specifies character of thousands separator

##### `decimal` *{string}*
Specifies decimal character

##### `prefix` *{string}*
Static text before the animating value

##### `suffix` *{string}*
Static text after the animating value

##### `className` *{string}*
CSS class to be applied to the wrapper containing the number.

##### `callback` *{function}*
Callback function to be triggered after completed count up
 animation

## Advanced Usage
By default, the count up animation only happens if any of the above props change.

In cases when you require the animation to trigger on ancestor component(s) re-render, you can turn off this optimization by setting the `redraw` prop to `true`.
 
##### `redraw` *{boolean}*
Animate on every ancestor component render cycle

## License
MIT
