# [React CountUp](https://glennreyes.github.io/react-countup)

[![Build Status](https://travis-ci.org/glennreyes/react-countup.svg?branch=master)](https://travis-ci.org/glennreyes/react-countup)
[![Coverage Status](https://coveralls.io/repos/github/glennreyes/react-countup/badge.svg?branch=master)](https://coveralls.io/github/glennreyes/react-countup?branch=master)
[![Dependency Status](https://david-dm.org/glennreyes/react-countup.svg)](https://david-dm.org/glennreyes/react-countup)
[![Dependency Status](https://david-dm.org/glennreyes/react-countup/dev-status.svg)](https://david-dm.org/glennreyes/react-countup#info=devDependencies)
[![npm version](https://badge.fury.io/js/react-countup.svg)](https://badge.fury.io/js/react-countup)


A React component wrapper around [CountUp.js](https://inorganik.github.io/countUp.js/).
This component counts up a number in an animated way.

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

### Attributes

##### `start` *{number}*
The start number from which the should start from

##### `end` *{number}*
Target number to count up

##### `duration` in s *{number}*
Duration of count up animation

##### `decimals` *{number}*
Amount of decimals

##### `useEasing` *{boolean}*
use "easeOutExpo" if `true`

##### `useGrouping` *{boolean}*
group thousands by separator character

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

## License
MIT
