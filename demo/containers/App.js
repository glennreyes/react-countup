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
      end: (new Date()).getFullYear() || 2016,
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
          <p className={styles.Description}>
            A React component wrapper around <a
              href="//inorganik.github.io/countUp.js/"
            >CountUp.js</a>.
            This component counts up a number in an animated way.
          </p>
          <a href="https://github.com/glennreyes/react-countup">
            <img
              className={styles.Ribbon}
              src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67"
              alt="Fork me on GitHub"
              data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"
            />
          </a>
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
        </section>

        <section>
          <h2>Demo</h2>
          <div className={styles.Demo}>
            <CountUp className={styles.CountUp} start={start} end={end} duration={duration} />
          </div>
          <form className={styles.Form}>
            <div className={styles.Form__groups}>
              <div className={styles.Form__group}>
                <label className={styles.Label}>Start: </label>
                <input
                  className={styles.TextField}
                  type="text"
                  name="start"
                  value={start}
                  onChange={this.handleChange}
                />
              </div>
              <div className={styles.Form__group}>
                <label className={styles.Label}>End: </label>
                <input
                  className={styles.TextField}
                  type="text"
                  name="end"
                  value={end}
                  onChange={this.handleChange}
                />
              </div>
              <div className={styles.Form__group}>
                <label className={styles.Label}>Duration in seconds: </label>
                <input
                  className={styles.TextField}
                  type="text"
                  name="duration"
                  value={duration}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <button className={styles.Button} onClick={this.startAnimation}>Start animation</button>
          </form>
        </section>

        <footer className={styles.Footer}>
          <p>Handcrafted with <span className={styles.Heart}>&#x2764;</span> by <a href="//twitter.com/glnnrys">Glenn Reyes</a></p>
        </footer>
      </div>
    );
  }
}

export default App;
