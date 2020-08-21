import { ApiClient } from './ApiClient';
import { Params } from './typings';

const initializeClient = () => {
  const apiClient = new ApiClient();

  return apiClient;
};

const apiClientInstance = initializeClient();

export default apiClientInstance;
