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
  description: string;
};

export type AddOrUpdateGroupUserRequest = {
  userLogin: string;
  role: 'admin' | 'memeber';
};
