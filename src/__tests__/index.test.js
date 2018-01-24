import React from 'react';
import { render } from 'react-dom';
import renderer from 'react-test-renderer';
import CountUp, { formatNumber, startAnimation } from '../index';

it('renders correctly', () => {
  const createNodeMock = () => ({ startAnimation });
  const tree = renderer
    .create(<CountUp start={0} end={10} onStart={() => {}} />, {
      createNodeMock,
    })
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with wrong onStart type', () => {
  const createNodeMock = () => ({ startAnimation });
  const tree = renderer
    .create(<CountUp start={0} end={10} onStart="Something wrong" />, {
      createNodeMock,
    })
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with formattingFn', () => {
  const createNodeMock = () => ({ startAnimation });
  const tree = renderer
    .create(
      <CountUp start={0} end={10} formattingFn={v => `formated:${v}`} />,
      {
        createNodeMock,
      },
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('should update on new duration', () => {
  const node = document.createElement('div');
  const instance = render(<CountUp duration={1} />, node);
  jest.spyOn(instance, 'componentDidUpdate');
  render(<CountUp duration={2} />, node);
  expect(instance.componentDidUpdate).toHaveBeenCalled();
});

it('should update on new start', () => {
  const node = document.createElement('div');
  const instance = render(<CountUp start={1} />, node);
  jest.spyOn(instance, 'componentDidUpdate');
  render(<CountUp start={2} />, node);
  expect(instance.componentDidUpdate).toHaveBeenCalled();
});

it('should update on new end', () => {
  const node = document.createElement('div');
  const instance = render(<CountUp end={1} />, node);
  jest.spyOn(instance, 'componentDidUpdate');
  render(<CountUp end={2} />, node);
  expect(instance.componentDidUpdate).toHaveBeenCalled();
});

it('should throw an error if no component specified in startAnimation', () => {
  expect(() => startAnimation('😍')).toThrow();
});

it('formats decimal number correctly', () => {
  const formattedNumber = formatNumber(123456.789, {
    decimal: ',',
    decimals: 2,
    separator: '.',
    prefix: 'a ',
    suffix: ' b',
  });
  expect(formattedNumber).toBe('a 123.456,79 b');
});

it('formats arbitrary number correctly', () => {
  const formattedNumber = formatNumber(123456, {
    decimal: '',
    decimals: 2,
    separator: '',
    prefix: 'a ',
    suffix: ' b',
  });
  expect(formattedNumber).toBe('a 12345600 b');
});

it('formats negative number with separator correctly', () => {
  const formattedNumber = formatNumber(-123456.789, {
    decimal: '.',
    decimals: 2,
    separator: ' ',
  });
  expect(formattedNumber).toBe('-123 456.79');
});
