import { shallow } from 'enzyme';
import expect from 'expect';
import React from 'react';
import CountUp from '../src';


describe('<CountUp />', () => {
  const component = shallow(<CountUp />);

  it('should render an empty span', () => {
    expect(component.html()).toEqual('<span></span>');
  });

  it('doesn\'t have a className assigned', () => {
    expect(component.hasClass()).toBe(false);
  });

});


describe('<CountUp className="MyClass" />', () => {
  const component = shallow(<CountUp className="MyClass" />);

  it('should render an empty span', () => {
    expect(component.html()).toEqual('<span class="MyClass"></span>');
  });

  it('has className "MyClass" assigned', () => {
    expect(component.hasClass()).toBe(false);
  });

});


describe('<CountUp style={{ color: "blue" }} />', () => {
  const component = shallow(<CountUp style={{ color: "blue" }} />);

  it('should render an empty span', () => {
    expect(component.html()).toEqual('<span style="color:blue;"></span>');
  });

  it('has blue color style assigned', () => {
    expect(component.prop('style').color).toBe('blue');
  });

});
