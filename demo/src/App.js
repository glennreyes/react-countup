import React, { Component } from 'react';
import Highlight from 'react-highlight';
import { repository } from '../package.json';
import 'highlight.js/styles/solarized-dark.css';
import 'normalize.css';

import CountUp, { startAnimation } from 'react-countup';
import './App.css';

const GitHubCorner = ({ homepage }) => (
  <a href={homepage}>
    <svg
      className="Octo"
      width="80"
      height="80"
      viewBox="0 0 250 250"
    >
      <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
      <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" className="Octo__arm" />
      <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" />
    </svg>
  </a>
);

export default class App extends Component {
  state = {
    start: 0,
    end: (new Date()).getFullYear(), // Just the current year
    duration: 3,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: Math.round(value) });
  }

  handleStartAnimation = (event) => {
    startAnimation(this.myCountUp);
    event.preventDefault();
  }

  render() {
    const { start, end, duration } = this.state;

    return (
      <div className="Wrapper">
        <header>
          <h1>React CountUp</h1>
          <p className="Description">
            A React component wrapper around <a href="//inorganik.github.io/countUp.js/">CountUp.js</a>.
            This component counts up a number in an animated way.
          </p>
          {repository && repository.url && (
            <GitHubCorner homepage={repository.url} />
          )}
        </header>
        <section>
          <h2>Demo</h2>
          <div className="Demo">
            <CountUp
              className="CountUp"
              start={start}
              end={end}
              duration={duration}
              ref={(countUp) => {
                this.myCountUp = countUp;
              }}
              onComplete={() => {
                console.log('Completed! 👏');
              }}
              onStart={() => {
                console.log('Started! 💨');
              }}
            />
          </div>

          <form className="Form">
            <div className="Form__groups">
              <div className="Form__group">
                <label className="Label" htmlFor="start">Start: </label>
                <input
                  className="TextField"
                  name="start"
                  type="number"
                  value={start}
                  onChange={this.handleChange}
                />
              </div>
              <div className="Form__group">
                <label className="Label" htmlFor="end">End: </label>
                <input
                  className="TextField"
                  name="end"
                  type="number"
                  value={end}
                  onChange={this.handleChange}
                />
              </div>
              <div className="Form__group">
                <label className="Label" htmlFor="duration">Duration in seconds: </label>
                <input
                  className="TextField"
                  name="duration"
                  type="number"
                  value={duration}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <button className="Button" onClick={this.handleStartAnimation}>Start animation</button>
          </form>
        </section>

        <section>
          <h2>Installation</h2>
          <Highlight>
            npm install react-countup --save
          </Highlight>
        </section>

        <section>
          <h2>Usage</h2>
          <Highlight>
            {
`import React from 'react';
import { render } from 'react-dom';
import CountUp from 'react-countup';

render(
  <CountUp start={${start}} end={${end}} duration={${duration}} />,
  document.getElementById('root')
);`
            }
          </Highlight>
        </section>

        <footer className="Footer">
          <p>
            With
            {' '}
            <span className="Emoji">❤️</span>
            {' by '}
            <a href="//twitter.com/glnnrys">Glenn Reyes</a>
          </p>
        </footer>
      </div>
    );
  }
}
