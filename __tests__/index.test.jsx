import React from 'react';
import { render } from 'react-dom';
import renderer from 'react-test-renderer';
import CountUp, { startAnimation } from '../index';

it('renders correctly', () => {
  const createNodeMock = () => ({ startAnimation });
  const tree = renderer.create(
    <CountUp start={0} end={10} onStart="something wrong" />,
    { createNodeMock },
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should call componentDidUpdate function', () => {
  const node = document.createElement('div');
  const instance = render(<CountUp start={0} end={10} />, node);
  jest.spyOn(instance, 'componentDidUpdate');
  render(<CountUp start={0} end={200} />, node);
  expect(instance.componentDidUpdate).toHaveBeenCalled();
});

it('should throw an error if no component specified in startAnimation', () => {
  expect(() => startAnimation('😍')).toThrow();
});
