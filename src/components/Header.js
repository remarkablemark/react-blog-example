import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

export const height = 64;

export class Header extends PureComponent {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
    history: PropTypes.shape({
      goBack: PropTypes.func,
      length: PropTypes.number,
      push: PropTypes.func,
    }).isRequired,
  };

  _handleClick = () => {
    const { history: { goBack, length, push } } = this.props;
    length < 4 ? push('/') : goBack();
  };

  render() {
    const { location: { pathname } } = this.props;
    const isPost = pathname.indexOf('/posts/') !== -1;

    return (
      <AppBar
        title="ACME CORP BLOG"
        iconElementLeft={
          isPost ? (
            <IconButton onClick={this._handleClick}>
              <ArrowBack />
            </IconButton>
          ) : null
        }
        showMenuIconButton={isPost}
        style={{ textAlign: 'center' }}
      />
    );
  }
}

const HeaderWithRouter = withRouter(Header);
export default HeaderWithRouter;
