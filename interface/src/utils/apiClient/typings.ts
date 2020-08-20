export enum Method {
  get,
  post,
  put,
  delete,
}

export enum Methods {
  GET,
  POST,
  PUT,
  DELETE,
}

export type Params = Record<string, string> | Record<string, unknown>;

export type RequestData = {
  url: string;
  params: Params;
  method: Methods;
};
