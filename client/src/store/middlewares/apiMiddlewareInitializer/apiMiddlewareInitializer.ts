import { Store } from 'redux';
import { ApiClient } from 'utils/apiClient/ApiClient';
import { ActionType } from 'store/typings';

// FIXME: fix any type for store
export const apiMiddlewareInitializer = (apiClient: ApiClient) => ({ dispatch }: any) => (
  next: (action: ActionType) => void,
) => (action: ActionType) => {
  if (!action.types) {
    next(action);
    return;
  }

  if (action.types.length !== 3) {
    console.warn('Wrong action types field => ', action.types);
    return;
  }

  const { type, types, api: requestData, ...restActionFields } = action;
  const [REQUEST_TYPE, REQUEST_SUCCESS_TYPE, REQUEST_FAIL_TYPE] = types;

  if (!requestData) {
    console.warn('RequestData must hold params: url, method. requestData: ', requestData);
    return;
  }

  dispatch({
    type: REQUEST_TYPE,
    ...restActionFields,
  });

  return apiClient
    .request(requestData)
    .then((payload: Record<string, any>) => {
      dispatch({
        type: REQUEST_SUCCESS_TYPE,
        ...restActionFields,
        payload,
      });
    })
    .catch((error) => {
      dispatch({
        type: REQUEST_FAIL_TYPE,
        error,
      });
    });
};
