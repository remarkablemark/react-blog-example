import React from 'react';
import { shallow } from 'enzyme';
import PostList, { TRUNCATION_LIMIT } from './PostList';
import moment from 'moment';

// filler words
const words = 'lorem ipsum dolor sit amet';

/**
 * Helper that generates string of length.
 *
 * @param  {Number} len
 * @return {String}
 */
const generateStringOfLength = len => (
  Array(Math.ceil(len / words.length))
    .fill(words)
    .join(' ')
    .substring(0, len)
);

describe('PostList', () => {
  let wrapper;
  const _fromNow = moment.prototype.fromNow;
  const mockFromNow = jest.fn(() => '42 minutes ago');

  beforeAll(() => {
    moment.prototype.fromNow = mockFromNow;
  });

  afterAll(() => {
    moment.prototype.fromNow = _fromNow;
  });

  describe('when props.isLoading=true', () => {
    let props;

    beforeEach(() => {
      props = {
        fetchPosts: () => {},
        isLoading: true,
        posts: [],
      };
      wrapper = shallow(<PostList {...props} />);
    });

    it('does not render Waypoint', () => {
      expect(wrapper.find('Waypoint').length).toBe(0);
    });

    it('renders correctly', () => {
      expect(wrapper.getElement()).toMatchSnapshot();
    });
  });

  describe('when props.isLoading=false', () => {
    let props;

    beforeEach(() => {
      props = {
        fetchPosts: () => {},
        isLoading: false,
        posts: [],
      };
      wrapper = shallow(<PostList {...props} />);
    });

    it('renders Waypoint', () => {
      expect(wrapper.find('Waypoint').length).toBe(1);
    });

    it('renders correctly', () => {
      expect(wrapper.getElement()).toMatchSnapshot();
    });
  });

  describe('when props.posts=[{ date, id, slug, summary, title }]', () => {
    let props;

    beforeEach(() => {
      props = {
        fetchPosts: () => {},
        isLoading: false,
        posts: [{
          date: new Date('2020-10-05T01:51:32.077Z'),
          id: 'abc123',
          slug: 'slug',
          summary: 'Summary.',
          title: 'Title',
        }],
      };
      wrapper = shallow(<PostList {...props} />);
    });

    it('renders correctly', () => {
      expect(wrapper.getElement()).toMatchSnapshot();
    });

    it(`renders summary when length is less than ${TRUNCATION_LIMIT}`, () => {
      const { posts } = props;
      const summary = generateStringOfLength(TRUNCATION_LIMIT - 10);
      posts[0].summary = summary;
      wrapper.setProps({ posts });
      expect(wrapper.find('article').find('p').getElement()).toMatchSnapshot();
    });

    it(`renders summary when length is greater than ${TRUNCATION_LIMIT}`, () => {
      const { posts } = props;
      const summary = generateStringOfLength(TRUNCATION_LIMIT + 10);
      posts[0].summary = summary;
      wrapper.setProps({ posts });
      expect(wrapper.find('article').find('p').getElement()).toMatchSnapshot();
    });
  });
});
