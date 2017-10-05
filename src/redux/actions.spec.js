import {
  FETCH_POSTS,
  RECEIVE_POSTS,
  receivePosts,
  fetchPosts,
  fetchPost,
} from './actions';

jest.useFakeTimers();

describe('action constants', () => {
  it(`should match value for ${FETCH_POSTS}`, () => {
    expect(FETCH_POSTS).toBe('FETCH_POSTS');
  });

  it(`should match value for ${RECEIVE_POSTS}`, () => {
    expect(RECEIVE_POSTS).toBe('RECEIVE_POSTS');
  });
});

describe('action creators', () => {
  describe('receivePosts', () => {
    const { type, posts } = receivePosts();

    it('matches constant', () => {
      expect(type).toBe(RECEIVE_POSTS);
    });

    it('should return 1 post by default', () => {
      expect(posts.length).toBe(1);
    });

    it('should match post schema', () => {
      const { id, title, summary, content, date, slug } = posts[0];
      expect(typeof id).toBe('string');
      expect(typeof title).toBe('string');
      expect(typeof summary).toBe('string');
      expect(typeof content).toBe('string');
      expect(date).toBeInstanceOf(Date);
      expect(typeof slug).toBe('string');
    });

    it('should return 10 posts', () => {
      const count = 10;
      const { posts } = receivePosts(count);
      expect(posts.length).toBe(count);
    });

    it('should use passed post id and slug', () => {
      const postId = 'id';
      const postSlug = 'slug';
      const { posts } = receivePosts(1, { id: postId, slug: postSlug });
      const { id, slug } = posts[0];
      expect(id).toBe(postId);
      expect(slug).toBe(postSlug);
    });
  });

  describe('fetchPosts', () => {
    it('returns a thunk', () => {
      const thunk = fetchPosts();
      expect(typeof thunk).toBe('function');
    });

    describe('when thunk is called', () => {
      let mockDispatch;

      beforeAll(() => {
        const thunk = fetchPosts();
        mockDispatch = jest.fn();
        thunk(mockDispatch);
        jest.runTimersToTime(1000);
      });

      it('should dispatch action', () => {
        expect(mockDispatch).toBeCalled();
      });

      it(`should receive type ${RECEIVE_POSTS}`, () => {
        expect(mockDispatch.mock.calls[0][0].type).toBe(RECEIVE_POSTS);
      });

      it('should receive 10 posts', () => {
        expect(mockDispatch.mock.calls[0][0].posts.length).toBe(10);
      });
    });
  });

  describe('fetchPost', () => {
    it('returns a thunk', () => {
      const thunk = fetchPost();
      expect(typeof thunk).toBe('function');
    });

    describe('when thunk is called', () => {
      let mockDispatch;
      const id = 'id';
      const slug = 'slug';

      beforeAll(() => {
        const thunk = fetchPost(id, slug);
        mockDispatch = jest.fn();
        thunk(mockDispatch);
        jest.runTimersToTime(1000);
      });

      it('should dispatch action', () => {
        expect(mockDispatch).toBeCalled();
      });

      it(`should receive type ${RECEIVE_POSTS}`, () => {
        expect(mockDispatch.mock.calls[0][0].type).toBe(RECEIVE_POSTS);
      });

      it('should receive 1 post', () => {
        expect(mockDispatch.mock.calls[0][0].posts.length).toBe(1);
      });

      it('should receive post with passed id and slug', () => {
        const { id, slug } = mockDispatch.mock.calls[0][0];
        expect(id).toBe(id);
        expect(slug).toBe(slug);
      });
    });
  });
});
