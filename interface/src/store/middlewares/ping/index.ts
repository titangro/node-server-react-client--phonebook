import { Store } from 'redux';
import { ActionType } from 'store/typings';

export const ping = (store: any) => (next: (action: ActionType) => void) => (action: ActionType) => {
  console.log(`Тип события: ${action.type}, дополнительные данные события:`, action.payload);
  return next(action);
};
