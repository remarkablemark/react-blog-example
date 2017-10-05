import { posts as postsReducer } from './reducers';
import { FETCH_POSTS, RECEIVE_POSTS } from './actions';

describe('posts reducer', () => {
  describe('when state=undefined', () => {
    it('should return the initial state', () => {
      expect(postsReducer(undefined, {})).toEqual({
        isFetching: false,
        items: [],
      });
    });

    it(`should handle ${FETCH_POSTS}`, () => {
      expect(postsReducer(undefined, { type: FETCH_POSTS })).toEqual({
        isFetching: true,
        items: [],
      });
    });

    it(`should handle ${RECEIVE_POSTS}`, () => {
      const posts = [1, 2, 3];
      expect(postsReducer(undefined, {
        type: RECEIVE_POSTS,
        posts,
      })).toEqual({
        isFetching: false,
        items: posts,
      });
    });
  });

  describe('when state.items=[0]', () => {
    const initialState = {
      isFetching: false,
      items: [0],
    };

    it('should return the initial state', () => {
      expect(postsReducer(initialState, {})).toEqual({
        isFetching: false,
        items: initialState.items,
      });
    });

    it(`should handle ${FETCH_POSTS}`, () => {
      expect(postsReducer(initialState, { type: FETCH_POSTS })).toEqual({
        isFetching: true,
        items: initialState.items,
      });
    });

    it(`should handle ${RECEIVE_POSTS}`, () => {
      const posts = [1, 2, 3];
      expect(postsReducer(initialState, {
        type: RECEIVE_POSTS,
        posts,
      })).toEqual({
        isFetching: false,
        items: initialState.items.concat(posts),
      });
    });
  });
});
