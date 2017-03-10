import React from 'react';
import { render } from 'react-dom';
import { mount } from 'enzyme';
import CountUp, { startAnimation } from '../index';


test('should render after an update start value 1000.00', () => {
  const component = mount(
    <CountUp
      className="MyClass"
      style={{ color: 'blue' }}
      start={1000}
      end={2000}
      duration={1}
      decimals={2}
      useEasing={false}
      useGrouping={false}
    />,
  );
  expect(component.update().text()).toBe('1000.00');
});

test('should call componentDidUpdate function', () => {
  const node = document.createElement('div');
  const instance = render(<CountUp start={0} end={100} />, node);
  jest.spyOn(instance, 'componentDidUpdate');
  render(<CountUp start={0} end={200} />, node);
  expect(instance.componentDidUpdate).toHaveBeenCalled();
});

test('should throw an error if no component specified in startAnimation', () => {
  expect(() => startAnimation(undefined)).toThrow();
});
