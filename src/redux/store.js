import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

export default createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, createLogger()),
);
