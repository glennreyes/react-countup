import { shallow, mount } from 'enzyme';
import expect from 'expect';
import React from 'react';
import CountUp from '../src';


describe('<CountUp start={0} end={100} />', function() {
  const component = mount(<CountUp start={0} end={100} />);

  it('has 0 as start value assigned', () => {
    expect(component.prop('start')).toBe(0);
  });

  it('has 100 as end value assigned', () => {
    expect(component.prop('end')).toBe(100);
  });

  it('doesn\'t have a className assigned', () => {
    expect(component.hasClass()).toBe(false);
  });

});


describe('<CountUp className="MyClass" />', () => {
  const component = shallow(<CountUp className="MyClass" />);

  it('should render an empty span', () => {
    expect(component.text()).toBe('');
  });

  it('has className "MyClass" assigned', () => {
    expect(component.hasClass()).toBe(false);
  });

});


describe('<CountUp className="MyClass" style={{ color: "blue" }} />', () => {
  const component = shallow(<CountUp className="MyClass" style={{ color: "blue" }} />);

  it('has blue color style assigned', () => {
    expect(component.prop('style').color).toBe('blue');
  });

});


describe('<CountUp className="MyClass" style={{ color: "blue" }} start={1000} end={2000} duration={1} decimals={2} useEasing={false} useGrouping={false} />', () => {
  const component = mount(<CountUp className="MyClass" style={{ color: "blue" }} start={1000} end={2000} duration={1} decimals={2} useEasing={false} useGrouping={false} />);

  it('should render start value 100.00 as node value', () => {
    expect(component.text()).toBe('1000.00');
  });

  it('should have easing disabled', () => {
    expect(component.prop('useEasing')).toBe(false);
  });

  it('should have grouping disabled', () => {
    expect(component.prop('useGrouping')).toBe(false);
  });

});


describe('<CountUp className="MyClass" style={{ color: "blue" }} start={1000} end={2000} duration={1} decimals={2} useEasing={false} useGrouping={true} separator="." decimal="," prefix="EUR " suffix=" left" />', () => {
  const component = mount(<CountUp className="MyClass" style={{ color: "blue" }} start={1000} end={2000} duration={1} decimals={2} useEasing={false} useGrouping={true} separator="." decimal="," prefix="EUR " suffix=" left" />);

  it('should render start value \'EUR 1.000,00 left\' as node value', () => {
    expect(component.text()).toBe('EUR 1.000,00 left');
  });

  it('should have a dot as separator', () => {
    expect(component.prop('separator')).toBe('.');
  });

  it('should have a comma as decimal', () => {
    expect(component.prop('decimal')).toBe(',');
  });

  it('should render EUR as prefix', () => {
    expect(component.prop('prefix')).toBe('EUR ');
  });

  it('should render left as suffix', () => {
    expect(component.prop('suffix')).toBe(' left');
  });
});


describe('<CountUp className="MyClass" style={{ color: "blue" }} start={1000} end={2000} duration={1} />', () => {
  const component = mount(<CountUp className="MyClass" style={{ color: "blue" }} start={1000} end={2000} duration={1} />);

  it('should render start value 1000 as node value', () => {
    expect(component.text()).toBe('1000');
  });

  it('doesn\'t have a className assigned', () => {
    expect(component.hasClass()).toBe(false);
  });

  it('should render bigger value than 1000 after 1 second', (done) => {
    setTimeout(() => {
      expect(Math.round(component.text())).toBeGreaterThan(1000);
    }, 1000);
    setTimeout(done, 1000);
  });

});
