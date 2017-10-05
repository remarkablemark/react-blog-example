import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import { getFullYear } from '../helpers/utilities';
import { height as headerHeight } from './Header';

const footerHeight = 50;
const contentStyle = {
  minHeight: `calc(100vh - ${headerHeight + footerHeight}px)`,
};
const paperStyle = { padding: 16 };

export default class Post extends PureComponent {
  static propTypes = {
    fetchPost: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    post: PropTypes.shape({
      content: PropTypes.string,
      date: PropTypes.instanceOf(Date),
      title: PropTypes.string,
    }),
    slug: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { fetchPost, id, post, slug } = this.props;
    if (!post) {
      fetchPost(id, slug);
    }
  }

  _renderProgress = () => {
    return (
      <div style={{ ...paperStyle, textAlign: 'center' }}>
        <br />
        <CircularProgress size={80} thickness={6} />
      </div>
    );
  };

  _renderPost = () => {
    const { title, date, content } = this.props.post;
    return (
      <Paper zDepth={0} style={paperStyle}>
        <article>
          <h1>{title}</h1>
          <time dateTime={date}>{moment(date).fromNow()}</time>
          <br />
          <br />
          <Divider />
          {content && content
            .split('\n')
            .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </article>
      </Paper>
    );
  };

  render() {
    return (
      <div>
        <div style={contentStyle}>
          {this.props.post ? this._renderPost() : this._renderProgress()}
        </div>
        <Divider />
        <Paper zDepth={0} style={paperStyle}>
          <footer>Copyright {getFullYear()} Acme Corp.</footer>
        </Paper>
      </div>
    );
  }
}
