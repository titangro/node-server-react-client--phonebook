import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from 'store/configureStore';
import { initialReduxState } from 'store/initialReduxState';

const store = configureStore(initialReduxState);

export const withRedux = (Component: React.FC) => (props: Record<string, any>) => {
  return (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
};
