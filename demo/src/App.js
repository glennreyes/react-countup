import React, { Component, Fragment } from 'react';
import CountUp from 'react-countup';
import { description, repository } from 'react-countup/package';
import { RotateCw } from 'react-feather';
import GithubCorner from 'react-github-corner';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import styled from 'styled-components';

const RefreshButton = styled.button`
  background: none;
  border: none;
  color: slategray;
  opacity: 0.5;
  outline: none;
  padding: 0;
  position: absolute;
  right: 16px;
  top: 16px;
  transition: 0.2s;
  width: 16px;

  &:hover {
    opacity: 1;
  }
`;

const Editor = styled(LiveEditor).attrs({ style: { padding: 16 } })`
  font-family: 'Overpass Mono', monospace;
  overflow: auto;
`;

const Error = styled(LiveError)`
  background: palevioletred;
  color: white;
  grid-column: span 2;
  padding: 16px;
`;

class Example extends Component {
  refresh = () => this.forceUpdate();

  render() {
    const { children, code, title, ...rest } = this.props;

    return (
      <Fragment>
        <Fragment>
          <Subtitle>{title}</Subtitle>
          <Provider scope={{ CountUp }} code={code.trim()} {...rest}>
            <Editor />
            <RefreshButton onClick={this.refresh} title="Re-render">
              <RotateCw size={16} />
            </RefreshButton>
            <Preview />
            <Error />
          </Provider>
          {children}
        </Fragment>
      </Fragment>
    );
  }
}

const Footer = styled.footer`
  border-top: 2px solid whitesmoke;
  margin-top: 64px;
  padding-top: 16px;
`;

const Main = styled.main`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  margin: 32px auto;
  max-width: 960px;
`;

const Preview = styled(LivePreview)`
  align-items: center;
  background: whitesmoke;
  display: flex;
  justify-content: center;
  min-height: 64px;
  padding: 16px;

  & div {
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  & span {
    display: flex;
    justify-content: center;
  }

  & button {
    background: white;
    border: none;
    border-radius: 4px;
    box-shadow: 0 4px 8px gainsboro;
    display: block;
    font-family: inherit;
    font-size: inherit;
    margin: 16px 0 auto;
    outline: none;
    padding: 8px 32px;

    &:active {
      transform: translateY(2px);
    }

    &:hover {
      background: snow;
    }
  }
`;

const Provider = styled(LiveProvider)`
  border-radius: 8px;
  box-shadow: 0 4px 8px gainsboro;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(2, 50%);
  position: relative;
`;

const Subtitle = styled.h2`
  margin-top: 2em;
`;
const Text = styled.p``;
const Title = styled.h1``;

const simple = `
<CountUp end={123456} />
`;

const renderProp = `
<CountUp
  className="account-balance"
  start={-875.039}
  end={160527.012}
  duration={2.75}
  separator=" "
  decimals={4}
  decimal=","
  prefix="EUR "
  suffix=" left"
  onEnd={() => console.log('Ended! 👏')}
  onStart={() => console.log('Started! 💨')}
  >
  {({ countUpRef, start }) => (
    <div>
      <span ref={countUpRef} />
      <button onClick={start}>Start</button>
    </div>
  )}
</CountUp>
`;

const manualStart = `
<CountUp start={0} end={100}>
  {({ countUpRef, start }) => (
    <div>
      <span ref={countUpRef} />
      <button onClick={start}>Start</button>
    </div>
  )}
</CountUp>
`;

const autoStart = `
<CountUp start={0} end={100} delay={0}>
  {({ countUpRef }) => (
    <div>
      <span ref={countUpRef} />
    </div>
  )}
</CountUp>
`;

const delayStart = `
<CountUp delay={2} end={100} />
`;

const repo = `https://github.com/${repository}`;

const App = () => (
  <Main>
    <Title>React CountUp</Title>
    <Text>{description}</Text>
    <Text>
      <a href={`${repo}#installation`}>Installation</a>
      {' · '}
      <a href={`${repo}#api`}>API</a>
    </Text>
    <Example code={simple} title="Simple">
      <Text>Edit the code to see live changes.</Text>
    </Example>
    <Example code={renderProp} title="Render prop" />
    <Example code={manualStart} title="Manually start with render prop" />
    <Example code={autoStart} title="Autostart with render prop" />
    <Example code={delayStart} title="Delay start" />
    <GithubCorner bannerColor="palevioletred" href={repo} />
    <Footer>
      <Text>
        MIT · <a href={repo}>GitHub</a> ·{' '}
        <a href="https://twitter.com/glnnrys">@glnnrys</a>
      </Text>
    </Footer>
  </Main>
);

export default App;
