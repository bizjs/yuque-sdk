import type { IdOrKey } from '../types/lib.type';
import type {
  GroupSerializer,
  AddOrUpdateGroupUserRequest,
  CreateGroupRequest,
  GroupDetailSerializer,
  GroupUserSerializer,
  DeleteGroupUserResp,
} from '../types/group.type';
import { YuqueAPIBase } from './YuqueAPIBase';

/**
 * 组织类 API 实现
 * https://www.yuque.com/yuque/developer/group
 */
export class GroupApi extends YuqueAPIBase {
  /**
   * 获取用户的组织列表
   * @param userIdOrloginId 用户 ID 或登录名
   * @deprecated 由于产品策略调整，知识小组创建入口已下线 https://www.yuque.com/yuque/qa/neyorv
   * @returns
   */
  queryUserGroups(userIdOrloginId: IdOrKey) {
    return this.get<GroupSerializer[]>(`/users/${userIdOrloginId}/groups`);
  }

  /**
   * 查询组织明细
   * @param groupIdOrLogin 组织 ID 或登录名
   * @deprecated 由于产品策略调整，知识小组创建入口已下线 https://www.yuque.com/yuque/qa/neyorv
   * @returns
   */
  getGroupDetail(groupIdOrLogin: IdOrKey) {
    return this.get<GroupDetailSerializer>(`/groups/${groupIdOrLogin}`);
  }

  /**
   * 查询公开的 Groups，由于知识小组已下线，将返回空数组
   * @deprecated 由于产品策略调整，知识小组创建入口已下线 https://www.yuque.com/yuque/qa/neyorv
   * @returns
   */
  queryPublicGroups() {
    return this.get<GroupSerializer[]>(`/groups`);
  }

  /**
   * 创建组织
   * @param createGroupRequest 组织创建信息
   * @deprecated 由于产品策略调整，知识小组创建入口已下线 https://www.yuque.com/yuque/qa/neyorv
   * @returns
   */
  createGroup(createGroupRequest: CreateGroupRequest) {
    return this.post<GroupDetailSerializer>(`/groups`, createGroupRequest);
  }

  /**
   * 更新单个组织的详细信息
   * @param groupIdOrLogin 组织 ID 或登录名
   * @param updateGroupRequest 要更新的数据
   * @deprecated 由于产品策略调整，知识小组创建入口已下线 https://www.yuque.com/yuque/qa/neyorv
   * @returns
   */
  updateGroup(groupIdOrLogin: IdOrKey, updateGroupRequest: CreateGroupRequest) {
    return this.put<GroupDetailSerializer>(`/groups/${groupIdOrLogin}`, updateGroupRequest);
  }

  /**
   * 删除组织
   * @param groupIdOrLogin 组织 ID 或登录名
   * @deprecated 由于产品策略调整，知识小组创建入口已下线 https://www.yuque.com/yuque/qa/neyorv
   * @returns
   */
  deleteGroup(groupIdOrLogin: IdOrKey) {
    return this.delete<GroupDetailSerializer>(`/groups/${groupIdOrLogin}`);
  }

  /**
   * 获取组织成员列表
   * @param groupIdOrLogin 组织 ID 或登录名
   * @deprecated 由于产品策略调整，知识小组创建入口已下线 https://www.yuque.com/yuque/qa/neyorv
   * @returns
   */
  queryGroupUsers(groupIdOrLogin: IdOrKey) {
    return this.get<GroupUserSerializer[]>(`/groups/${groupIdOrLogin}/users`);
  }

  /**
   * 增加或更新组织成员
   * @param groupIdOrLogin 组织 ID 或登录名
   * @deprecated 由于产品策略调整，知识小组创建入口已下线 https://www.yuque.com/yuque/qa/neyorv
   * @param data 更新数据
   * @returns
   */
  addOrUpdateGroupUser(groupIdOrLogin: IdOrKey, data: AddOrUpdateGroupUserRequest) {
    const reqData = { role: data.role === 'admin' ? 0 : 1 };
    return this.put<GroupUserSerializer>(`/groups/${groupIdOrLogin}/users/${data.userLogin}`, reqData);
  }

  /**
   * 删除组织成员
   * @param groupIdOrLogin 组织 ID 或登录名
   * @deprecated 由于产品策略调整，知识小组创建入口已下线 https://www.yuque.com/yuque/qa/neyorv
   * @param userLogin 用户登录名
   * @returns
   */
  deleteGroupUser(groupIdOrLogin: IdOrKey, userLogin: string) {
    return this.delete<DeleteGroupUserResp>(`/groups/${groupIdOrLogin}/users/${userLogin}`);
  }
}
