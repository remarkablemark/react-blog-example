import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  it('renders correctly', () => {
    const element = shallow(<App />).getElement();
    expect(element).toMatchSnapshot();
  });
});
