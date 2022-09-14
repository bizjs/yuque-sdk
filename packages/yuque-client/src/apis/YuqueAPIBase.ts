import type { RequestFn } from '../types/lib.type';

export abstract class YuqueAPIBase {
  constructor(private request: RequestFn) {}

  protected get<ResT extends any = any, ReqT extends any = any>(path: string) {
    return this.request<ResT, ReqT>('GET', path, null);
  }
}
