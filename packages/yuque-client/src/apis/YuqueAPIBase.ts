import type { RequestFn, RequestOptions } from '../types/lib.type';

export abstract class YuqueAPIBase {
  constructor(private request: RequestFn) {}

  protected get<ResT extends any = any>(path: string, options?: RequestOptions) {
    return this.request<ResT, null>('GET', path, null, options);
  }

  protected delete<ResT extends any = any>(path: string, options?: RequestOptions) {
    return this.request<ResT, null>('DELETE', path, null, options);
  }

  protected post<ResT extends any = any, ReqT extends any = any>(path: string, data: ReqT, options?: RequestOptions) {
    return this.request<ResT, ReqT>('POST', path, data, options);
  }

  protected put<ResT extends any = any, ReqT extends any = any>(path: string, data: ReqT, options?: RequestOptions) {
    return this.request<ResT, ReqT>('PUT', path, data, options);
  }
}
