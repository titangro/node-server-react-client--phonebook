import { ReduxState } from 'store/typings';

export const selectCounter = (state: ReduxState) => {
  const { clicker } = state;

  return clicker && clicker.counter;
};
