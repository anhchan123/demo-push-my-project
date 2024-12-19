export type Response<T> = {
  data?: T;
  message: string;
  statusCode: string | number;
};
