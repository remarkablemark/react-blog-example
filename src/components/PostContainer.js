import { connect } from 'react-redux';
import { find } from 'lodash';
import { fetchPost } from '../redux/actions';
import Post from './Post';

const mapStateToProps = (state, ownProps) => {
  const { match: { params: { id, slug } } } = ownProps;
  const post = find(state.posts.items, { id });
  return { id, post, slug };
};

const mapDispatchToProps = dispatch => ({
  fetchPost: (id, slug) => dispatch(fetchPost(id, slug)),
});

const wrapper = connect(mapStateToProps, mapDispatchToProps);
const PostContainer = wrapper(Post);
export default PostContainer;
