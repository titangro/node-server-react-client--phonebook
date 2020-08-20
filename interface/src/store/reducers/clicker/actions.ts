import types from './constants';

export const increaseCounter = (payload = {}) => {
  return {
    type: types.INSCREASE_COUNT,
    payload,
  };
};

export const decreaseCounter = (payload = {}) => {
  return {
    type: types.DECREASE_COUNT,
    payload,
  };
};
