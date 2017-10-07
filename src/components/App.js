import React, { PureComponent } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';
import PostListContainer from './PostListContainer';
import PostContainer from './PostContainer';
import store from '../redux/store';

export default class App extends PureComponent {
  _redirectToHome() {
    return <Redirect to="/" />;
  }

  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <Router>
            <div>
              <Header />

              {/* content */}
              <Switch>
                <Route exact path="/" component={PostListContainer} />
                <Route path="/posts/:id/:slug" component={PostContainer} />

                {/* catch-all redirects to home */}
                <Route render={this._redirectToHome} />
              </Switch>
            </div>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}
