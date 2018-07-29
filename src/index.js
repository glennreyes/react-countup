import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Count from 'countup.js';

class CountUp extends Component {
  static defaultProps = {
    decimal: '.',
    decimals: 0,
    easingFn: null,
    formattingFn: null,
    onComplete: undefined,
    onStart: undefined,
    prefix: '',
    separator: '',
    start: 0,
    suffix: '',
    redraw: false,
    style: undefined,
    useEasing: true,
  };

  static propTypes = {
    decimal: PropTypes.string,
    decimals: PropTypes.number,
    duration: PropTypes.number.isRequired,
    easingFn: PropTypes.func,
    end: PropTypes.number.isRequired,
    formattingFn: PropTypes.func,
    onComplete: PropTypes.func,
    onStart: PropTypes.func,
    prefix: PropTypes.string,
    separator: PropTypes.string,
    start: PropTypes.number,
    suffix: PropTypes.string,
    style: PropTypes.object,
    useEasing: PropTypes.bool,
  };

  componentDidMount() {
    this.countUpInstance = new Count(this.spanRef.current, 0, 200);

    this.countUpInstance.start();
  }

  spanRef = React.createRef();

  render() {
    return <span ref={this.spanRef} />;
  }
}

export default CountUp;
