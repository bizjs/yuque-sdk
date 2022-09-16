import type { IdOrKey } from '../types/lib.type';
import type { AddOrUpdateGroupUserRequest, CreateGroupRequest } from '../types/group.type';
import type { UserSerializer } from '../types/user.type';
import { YuqueAPIBase } from './YuqueAPIBase';

/**
 * 组织类 API 实现
 * https://www.yuque.com/yuque/developer/group
 */
export class GroupApi extends YuqueAPIBase {
  /**
   * 获取用户的组织列表
   * @param userIdOrloginId 用户 ID 或登录名
   * @returns
   */
  queryUserGroups(userIdOrloginId: IdOrKey) {
    return this.get<UserSerializer>(`/users/${userIdOrloginId}/groups`);
  }

  /**
   * 查询组织明细
   * @param groupIdOrLogin 组织 ID 或登录名
   * @returns
   */
  getGroupDetail(groupIdOrLogin: IdOrKey) {
    return this.get<UserSerializer>(`/groups/${groupIdOrLogin}`);
  }

  /**
   * 查询公开的 Groups
   * @returns
   */
  queryPublicGroups() {
    return this.get<UserSerializer>(`/groups`);
  }

  /**
   * 创建组织
   * @param createGroupRequest 组织创建信息
   * @returns
   */
  createGroup(createGroupRequest: CreateGroupRequest) {
    return this.post(`/groups`, createGroupRequest);
  }

  /**
   * 更新单个组织的详细信息
   * @param groupIdOrLogin 组织 ID 或登录名
   * @param updateGroupRequest 要更新的数据
   * @returns
   */
  updateGroup(groupIdOrLogin: IdOrKey, updateGroupRequest: CreateGroupRequest) {
    return this.put(`/groups/${groupIdOrLogin}`, updateGroupRequest);
  }

  /**
   * 删除组织
   * @param groupIdOrLogin 组织 ID 或登录名
   * @returns
   */
  deleteGroup(groupIdOrLogin: IdOrKey) {
    return this.delete(`/groups/${groupIdOrLogin}`);
  }

  /**
   * 获取组织成员列表
   * @param groupIdOrLogin 组织 ID 或登录名
   * @returns
   */
  queryGroupUsers(groupIdOrLogin: IdOrKey) {
    return this.get(`/groups/${groupIdOrLogin}/users`);
  }

  /**
   * 增加或更新组织成员
   * @param groupIdOrLogin 组织 ID 或登录名
   * @param data 更新数据
   * @returns
   */
  addOrUpdateGroupUser(groupIdOrLogin: IdOrKey, data: AddOrUpdateGroupUserRequest) {
    const reqData = { role: data.role === 'admin' ? 0 : 1 };
    return this.put(`/groups/${groupIdOrLogin}/users/${data.userLogin}`, reqData);
  }

  /**
   * 删除组织成员
   * @param groupIdOrLogin 组织 ID 或登录名
   * @param userLogin 用户登录名
   * @returns
   */
  deleteGroupUser(groupIdOrLogin: IdOrKey, userLogin: string) {
    return this.delete(`/groups/${groupIdOrLogin}/users/${userLogin}`);
  }
}
