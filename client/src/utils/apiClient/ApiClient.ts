import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

import { RequestData, Method } from './typings';
import { methods, config } from './constants';

export class ApiClient {
  protected readonly instance: AxiosInstance;

  public constructor() {
    this.instance = axios.create(config);
  }

  request(requestData: RequestData) {
    const { url, params, method } = requestData;

    const currentMethod: keyof typeof Method = methods[method] || methods.default;

    const config = params && {
      params,
    };

    const request: <T = any, R = AxiosResponse<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig | undefined,
    ) => Promise<R> = this.instance[currentMethod];

    return request(url, config);
  }
}
