import Undici, { RequestInit } from 'undici';
import { DocApi } from './apis/DocApi';
import { GroupApi } from './apis/GroupApi';
import { RepoApi } from './apis/RepoApi';
import { UserApi } from './apis/UserApi';
import type { RequestFn, RequestMethod, YuqueResponseBase } from './types/lib.type';
import { log } from './utils';

export type YuqueClientOptions = {
  /**
   * API Host，访问自定义空间时，需要配置
   */
  apiHost?: string;
  /**
   * 访问者应用名称，确保 yuque 能知道访问者是谁
   */
  appName: string;
  /**
   * 获取 Token 可通过点击语雀的个人头像，并进入 个人设置 页面拿到
   */
  accessToken: string;
};

const defaultYuqueClientOptions = {
  apiHost: 'https://www.yuque.com/api/v2',
};

export class YuqueClient {
  private finalOptions: YuqueClientOptions;
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
   * @deprecated 组织已经不在允许了
   */
  group: GroupApi;

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
  private request: RequestFn = <DataT, ReqT>(method: RequestMethod, url: string, data?: ReqT): Promise<DataT> => {
    const apiUrl = this.finalOptions.apiHost + url;
    const requestInit: RequestInit = {
      method,
      headers: {
        'X-Auth-Token': this.finalOptions.accessToken,
        'User-Agent': this.finalOptions.appName,
        'Content-Type': 'application/json',
      },
    };
    if (data) {
      requestInit.body = data as any;
    }

    // ● 200 - 成功
    // ● 400 - 请求的参数不正确，或缺少必要信息，请对比文档
    // ● 401 - 需要用户认证的接口用户信息不正确
    // ● 403 - 缺少对应功能的权限
    // ● 429 - 访问被限流，Too Many Requests
    // ● 404 - 数据不存在，或未开放
    // ● 500 - 服务器异常
    log('fetch url = %s, params = %o', apiUrl, requestInit);
    return Undici.fetch(apiUrl, requestInit)
      .then((res) => {
        return res.json() as Promise<YuqueResponseBase<DataT>>;
      })
      .then((resBody) => {
        console.log(resBody);
        return resBody.data;
      });
  };
}
