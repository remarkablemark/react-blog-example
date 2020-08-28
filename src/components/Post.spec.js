import React from 'react';
import { shallow } from 'enzyme';
import Post from './Post';
import moment from 'moment';

describe('Post', () => {
  let wrapper;
  const _fromNow = moment.prototype.fromNow;
  const mockFromNow = jest.fn(() => '42 minutes ago');

  beforeAll(() => {
    moment.prototype.fromNow = mockFromNow;
  });

  afterAll(() => {
    moment.prototype.fromNow = _fromNow;
  });

  describe('when props.post=undefined', () => {
    let props;

    beforeEach(() => {
      props = {
        fetchPost: jest.fn(),
        id: 'abc123',
        post: undefined,
        slug: 'slug',
      };
      wrapper = shallow(<Post {...props} />);
    });

    it('renders correctly', () => {
      expect(wrapper.getElement()).toMatchSnapshot();
    });

    it('calls fetchPost(id, slug)', () => {
      const { fetchPost, id, slug } = props;
      expect(fetchPost).toBeCalledWith(id, slug);
    });
  });

  describe('when props.post={ content, date, title }', () => {
    let props;

    beforeEach(() => {
      props = {
        fetchPost: jest.fn(),
        id: 'abc123',
        post: {
          content: 'Content',
          date: new Date('2020-10-05T01:51:32.077Z'),
          title: 'Title',
        },
        slug: 'slug',
      };
      wrapper = shallow(<Post {...props} />);
    });

    it('renders correctly', () => {
      expect(wrapper.getElement()).toMatchSnapshot();
    });

    it('does not call fetchPost()', () => {
      expect(props.fetchPost).not.toBeCalled();
    });
  });
});
