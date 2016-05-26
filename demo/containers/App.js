import React from 'react';
import CountUp from '../../src';
import Highlight from 'react-highlight.js';
import 'highlight.js/styles/solarized-dark.css';
import 'sanitize.css/lib/sanitize.css';
import styles from './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: 0,
      end: 2016,
      duration: 3,
    };

    this.startAnimation = this.startAnimation.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: Math.round(value) });
  }

  startAnimation(event) {
    this.forceUpdate();
    event.preventDefault();
  }

  render() {
    const { start, end, duration } = this.state;
    return (
      <div className={styles.Wrapper}>

        <header>
          <h1>React CountUp</h1>
          <p>
            A React component wrapper around CountUp.js.
            This component counts up a number in an animated way.
          </p>
        </header>

        <section>
          <h2>Installation</h2>
          <Highlight language="bash">
            npm install react-countup --save
          </Highlight>
        </section>

        <section>
          <h2>Usage</h2>
          <Highlight language="javascript">
{`import React from 'react';
import { render } from 'react-dom';
import CountUp from 'react-countup';

render(
  <CountUp start={0} end={2016} />,
  document.getElementById('root')
)`}
          </Highlight>
          <h2>Usage</h2>
        </section>

        <section>
          <h2>Demo</h2>
          <CountUp className={styles.CountUp} start={start} end={end} duration={duration} />
          <form>
            <label>Start: </label>
            <input type="text" name="start" value={start} onChange={this.handleChange} />
            <label>End: </label>
            <input type="text" name="end" value={end} onChange={this.handleChange} />
            <label>Duration: </label>
            <input type="text" name="duration" value={duration} onChange={this.handleChange} />
            <button onClick={this.startAnimation}>Start animation</button>
          </form>
        </section>

        <footer>
          <p>Handcrafted with &#x2764; by <a href="//twitter.com/glnnrys">Glenn Reyes</a></p>
        </footer>
      </div>
    );
  }
}

export default App;
