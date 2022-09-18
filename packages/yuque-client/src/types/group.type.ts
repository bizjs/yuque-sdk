import { UserSerializer } from './user.type';

/**
 * 知识小组模型
 * _serializer = "v2.group"
 */
export type GroupSerializer = {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  books_count: number;
  public_books_count: number;
  topics_count: number;
  public_topics_count: number;
  members_count: number;
  type: 'Group';
  public: number;
  description: string;
  created_at: string;
  updated_at: string;
};

/**
 * 知识小组详情模型
 * _serializer = "v2.group_detail"
 */
export type GroupDetailSerializer = GroupSerializer & {
  space_id: number;
  organization_id: number;
  owner_id: number;
  grains_sum: number;
};

/**
 * 知识小组用户
 * _serializer = "v2.group_user"
 */
export type GroupUserSerializer = {
  id: number;
  group_id: number;
  user_id: number;
  user: UserSerializer;
  role: number;
  visibility: number;
  status: number;
  created_at: string;
  updated_at: string;
  group: any;
};

export type CreateGroupRequest = {
  /**
   * 组织名称
   */
  name: string;
  /**
   * 登录名
   */
  login: string;
  /**
   * 介绍
   */
  description?: string;
};

export type AddOrUpdateGroupUserRequest = {
  userLogin: string;
  role: 'admin' | 'memeber';
};

export type DeleteGroupUserResp = {
  user_id: number;
};
