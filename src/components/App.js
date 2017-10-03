import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';
import PostListContainer from './PostListContainer';
import PostContainer from './PostContainer';
import store from '../store';

export default class App extends PureComponent {
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
              </Switch>
            </div>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}
