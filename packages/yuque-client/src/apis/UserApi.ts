import { User } from '../types/entities';
import { YuqueAPIBase } from './YuqueAPIBase';

export class UserApi extends YuqueAPIBase {
  /**
   * 根据用户 ID（user.id）或者登录账号查询用户信息
   * @param userId
   * @returns
   */
  getSingleUserInfo(userId: string | number): Promise<User> {
    return this.get<User>(`/users/${userId}`);
  }

  /**
   * 获取当前 AccessToken Owner 的信息
   * @returns
   */
  getCurrentUser() {
    return this.get<User>(`/user`);
  }
}
