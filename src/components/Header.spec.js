import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header';

describe('Header', () => {
  let wrapper;

  describe('when props.location.pathname="/"', () => {
    beforeEach(() => {
      const props = {
        location: { pathname: '/' },
        history: {},
      };
      wrapper = shallow(<Header {...props} />);
    });

    it('renders correctly', () => {
      expect(wrapper.getElement()).toMatchSnapshot();
    });
  });

  describe('when props.location.pathname="/posts/"', () => {
    beforeEach(() => {
      const props = {
        location: { pathname: '/posts/' },
        history: {},
      };
      wrapper = shallow(<Header {...props} />);
    });

    it('renders correctly', () => {
      expect(wrapper.getElement()).toMatchSnapshot();
    });

    describe('when props.history.length=3', () => {
      const mockPush = jest.fn();

      beforeEach(() => {
        wrapper.setProps({ history: {
          length: 3,
          push: mockPush,
        }});
      });

      it('calls history.push("/") when IconButton is clicked', () => {
        wrapper.find('AppBar').prop('iconElementLeft').props.onClick();
        expect(mockPush).toBeCalledWith('/');
      });
    });

    describe('when props.history.length=4', () => {
      const mockGoBack = jest.fn();

      beforeEach(() => {
        wrapper.setProps({ history: {
          length: 4,
          goBack: mockGoBack,
        }});
      });

      it('calls history.goBack() when IconButton is clicked', () => {
        wrapper.find('AppBar').prop('iconElementLeft').props.onClick();
        expect(mockGoBack).toBeCalledWith();
      });
    });
  });
});
