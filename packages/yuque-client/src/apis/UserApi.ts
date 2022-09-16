import type { IdOrKey } from '../types/lib.type';
import type { UserDetailSerializer } from '../types/user.type';
import { YuqueAPIBase } from './YuqueAPIBase';

/**
 * 用户类 API 实现
 * https://www.yuque.com/yuque/developer/user
 */
export class UserApi extends YuqueAPIBase {
  /**
   * 根据用户 ID（user.id）或者登录账号查询用户信息
   * @param userIdOrloginId 用户 ID 或 login
   * @returns
   */
  getSingleUserInfo(userIdOrloginId: IdOrKey): Promise<UserDetailSerializer> {
    return this.get<UserDetailSerializer>(`/users/${userIdOrloginId}`);
  }

  /**
   * 获取当前 AccessToken Owner 的信息
   * @returns
   */
  getCurrentUser() {
    return this.get<UserDetailSerializer>(`/user`);
  }
}
