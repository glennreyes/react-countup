import React from 'react';
import { render } from 'react-dom';
import CountUp from '../src';
import 'sanitize.css/lib/sanitize.css';
import styles from './styles.css';

render(
  <div className={styles.Wrapper}>
    <CountUp className={styles.CountUp} start={0} end={2016} duration={3} />
  </div>,
  document.getElementById('root')
);
