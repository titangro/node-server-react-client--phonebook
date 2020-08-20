import { AxiosRequestConfig } from 'axios';
import { Method } from './typings';

const host = process.env.REACT_APP_API_HOST;
const port = process.env.REACT_APP_API_PORT;
const path = process.env.REACT_APP_API_PATH;

export const methods: Record<string, keyof typeof Method> = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  default: 'get',
};

export const config: AxiosRequestConfig = {
  baseURL: `${host}${port ? `:${port}` : ''}/${path}`,
  responseType: 'json',
  withCredentials: true,
};
