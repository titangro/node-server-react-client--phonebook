import { ClickerState, ActionType } from 'store/typings';
import types from './constants';

const ACTIONS_HANDLERS = {
  [types.INSCREASE_COUNT]: (state: ClickerState, action: ActionType) => ({
    ...state,
    counter: state.counter + 1,
  }),
  [types.DECREASE_COUNT]: (state: ClickerState, action: ActionType) => ({
    ...state,
    counter: state.counter - 1,
  }),
};

const initialState = {
  counter: 0,
};

export const clicker = (state = initialState, action: ActionType) => {
  return ACTIONS_HANDLERS[action.type] ? ACTIONS_HANDLERS[action.type](state, action) : state;
};
