/**
 * 用户模型
 * _serializer =  "v2.user"
 */
export type UserSerializer = {
  /**
   * 用户 ID
   */
  id: number;
  /**
   * 用户类型
   */
  type: 'User' | 'Group';
  /**
   * 账号
   */
  login: string;
  /**
   * 昵称
   */
  name: string;
  /**
   * 描述
   */
  description: string;
  /**
   * 头像地址
   */
  avatar_url: string;
  followers_count: number;
  following_count: number;
  /**
   * 创建时间，如：2016-09-08T18:55:52.000Z
   */
  created_at: string;
  /**
   * 最后更新时间，如：2016-09-08T18:55:52.000Z
   */
  updated_at: string;
};

/**
 * 用户明细类型定义
 * _serializer =  "v2.user_detail"
 */
export type UserDetailSerializer = UserSerializer & {
  /**
   * 空间 ID，为 0 则表示是个人
   */
  space_id: number;
  account_id: number;
  /**
   * 知识库数量
   */
  books_count: number;
  /**
   * 公开的知识库数量
   */
  public_books_count: number;

  /**
   * 可见性，1
   */
  public: number;
};
