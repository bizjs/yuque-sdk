export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type RequestOptions = {
  query?: Record<string, string | number>;
};

export type IdOrKey = string | number;

export type RequestFn = <DataT, ReqT>(
  method: RequestMethod,
  url: string,
  data: ReqT | null,
  options?: RequestOptions
) => Promise<DataT>;

export type YuqueResponseBase<DataT> = {
  data: DataT;
  /**
   * 表述当前登陆者对于此资源的权限
   */
  abilities?: Record<string, any>;
  /**
   * 一些附加信息，例如是否赞过，是否关注过
   */
  meta?: Record<string, any>;

  message?: string;
  /**
   * 出现 status 或者 message 表示异常
   */
  status?: number;
};
