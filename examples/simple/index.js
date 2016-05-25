import React from 'react';
import { render } from 'react-dom';
import CountUp from '../../lib/CountUp';

render(
  <CountUp start={0} end={160526} />,
  document.getElementById('root')
);
