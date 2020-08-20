import { RequestData } from 'utils/apiClient/typings';

export type ClickerState = {
  counter: number;
};

export type ReduxState = {
  clicker?: ClickerState;
};

export type ActionType = {
  type: string;
  payload: Record<string, any>;
  types?: string[];
  api?: RequestData;
  error?: Record<string, any> | string;
};
