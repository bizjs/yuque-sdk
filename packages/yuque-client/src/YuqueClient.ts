import Undici, { RequestInit } from 'undici';
import { updateUrl } from '@bizjs/biz-utils-node';
import { DocApi } from './apis/DocApi';
import { GroupApi } from './apis/GroupApi';
import { RepoApi } from './apis/RepoApi';
import { UserApi } from './apis/UserApi';
import type { RequestFn, RequestMethod, RequestOptions, YuqueResponseBase } from './types/lib.type';
import { log } from './utils';

export type YuqueClientOptions = {
  /**
   * API Host，访问自定义空间时，需要配置
   */
  apiHost?: string;
  /**
   * 访问者应用名称，确保 yuque 能知道访问者是谁，默认 yuque-client
   */
  appName?: string;
  /**
   * 获取 Token 可通过点击语雀的个人头像，并进入 个人设置 页面拿到
   */
  accessToken: string;
};

type Ratelimit = {
  limit: number | null;
  remaining: number | null;
};

const defaultYuqueClientOptions: Partial<YuqueClientOptions> = {
  apiHost: 'https://www.yuque.com/api/v2',
  appName: 'yuque-client',
};

export class YuqueClient {
  private finalOptions: YuqueClientOptions;
  /**
   * 请求序列号
   */
  private static ReqSeqNumber = 0;
  /**
   * 用户相关接口
   */
  user: UserApi;

  /**
   * 文档相关接口
   */
  doc: DocApi;

  /**
   * 知识库相关接口
   */
  repo: RepoApi;

  /**
   * 组织（知识小组）相关接口
  //  * @deprecated 组织已经不在允许了
   */
  group: GroupApi;

  /**
   * 限流信息
   */
  ratelimit: Ratelimit = { limit: null, remaining: null };

  // 最后更新 ratelimit 的请求 ID
  private lastRateLimitReqSeqNumber: number = 0;

  constructor(options: YuqueClientOptions) {
    this.finalOptions = { ...defaultYuqueClientOptions, ...options };

    this.user = new UserApi(this.request);
    this.doc = new DocApi(this.request);
    this.repo = new RepoApi(this.request);
    this.group = new GroupApi(this.request);
  }

  /**
   * yuque open api 的请求函数
   * @param method
   * @param url
   * @param data
   * @returns
   */
  private request: RequestFn = async <DataT, ReqT>(
    method: RequestMethod,
    url: string,
    data?: ReqT,
    options?: RequestOptions
  ): Promise<DataT> => {
    let apiUrl = this.finalOptions.apiHost + url;
    if (options?.params) {
      apiUrl = updateUrl(apiUrl, { query: options.params });
    }
    const requestInit: RequestInit = {
      method,
      headers: {
        'X-Auth-Token': this.finalOptions.accessToken,
        'User-Agent': this.finalOptions.appName!,
        'Content-Type': 'application/json',
      },
      // redirect: 'manual'
      // dispatcher: new ProxyAgent({ uri: 'http://127.0.0.1:8888', requestTls: { rejectUnauthorized: false } }),
    };
    if (data) {
      requestInit.body = JSON.stringify(data);
    }

    // ● 200 - 成功
    // ● 400 - 请求的参数不正确，或缺少必要信息，请对比文档
    // ● 401 - 需要用户认证的接口用户信息不正确
    // ● 403 - 缺少对应功能的权限
    // ● 429 - 访问被限流，Too Many Requests
    // ● 404 - 数据不存在，或未开放
    // ● 500 - 服务器异常
    const reqSeqNumber = ++YuqueClient.ReqSeqNumber;
    log('%s: fetch url = %s, params = %o', reqSeqNumber, apiUrl, requestInit);
    return Undici.fetch(apiUrl, requestInit)
      .then((res): Promise<{ status: number; body: any; headers: Headers }> => {
        // 完全解析出请求数据
        return res.json().then((body) => {
          return { status: res.status, headers: res.headers, body };
        });
      })
      .then((responseData): Promise<YuqueResponseBase<DataT>> => {
        // 响应状态码不在 200~299，当做异常处理
        if (responseData.status < 200 || responseData.status > 299) {
          throw responseData;
        }

        // 更新限流信息
        const limit = responseData.headers.get('x-ratelimit-limit');
        const remaining = responseData.headers.get('x-ratelimit-remaining');
        // limit 存在表示进入更新限流逻辑
        if (limit) {
          // 如果最后更新限流的请求序列号小于当前，则意味着需要更新限流信息
          if (this.lastRateLimitReqSeqNumber < reqSeqNumber) {
            this.lastRateLimitReqSeqNumber = reqSeqNumber;
            this.ratelimit = { limit: Number(limit), remaining: Number(remaining) };
          }
        }
        log('%s: body = %o', reqSeqNumber, responseData.body);
        // 仅返回响应 body
        return responseData.body;
      })
      .then((resBody) => {
        return resBody.data;
      })
      .catch((reason) => {
        return Promise.reject(reason);
      });
  };
}
