import thunk from 'redux-thunk';
import { applyMiddleware, createStore, Store } from 'redux';

import { rootReducer } from 'store/reducers/root';

import { ping } from 'store/middlewares/ping';

import { ReduxState, ActionType } from 'store/typings';

import { apiClientInstance } from 'utils/apiClient';
import { apiMiddlewareInitializer } from 'store/middlewares/apiMiddlewareInitializer';

let store: Store<ReduxState, ActionType>;

export default (initialState: ReduxState) => {
  if (store) {
    return store;
  }

  const apiMiddleware = apiMiddlewareInitializer(apiClientInstance);

  const createdStore = createStore(rootReducer, initialState, applyMiddleware(apiMiddleware, ping, thunk));

  store = createdStore;

  return store;
};
