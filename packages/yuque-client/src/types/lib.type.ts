export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type RequestFn = <DataT, ReqT>(method: RequestMethod, url: string, data: ReqT | null) => Promise<DataT>;

export type YuqueResponseBase<DataT> = {
  data: DataT;
};
