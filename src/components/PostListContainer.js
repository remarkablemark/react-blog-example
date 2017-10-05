import { connect } from 'react-redux';
import { fetchPosts } from '../redux/actions';
import PostList from './PostList';

const mapStateToProps = state => {
  const { posts: { isFetching, items } } = state;
  return {
    isLoading: isFetching,
    posts: items,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
});

const wrapper = connect(mapStateToProps, mapDispatchToProps);
const PostListContainer = wrapper(PostList);
export default PostListContainer;
