export type User = {
  /**
   * ID
   */
  id: number;
  /**
   * 用户类型，User
   */
  type: string;
  /**
   * 账号
   */
  login: string;
  /**
   * 昵称
   */
  name: string;
  /**
   * 个人简介
   */
  description: string;
  /**
   * 头像地址
   */
  avatar_url: string;
  /**
   * 创建时间，如：2016-09-08T18:55:52.000Z
   */
  created_at: string;
  /**
   * 最后更新时间，如：2016-09-08T18:55:52.000Z
   */
  updated_at: string;

  // 文档上不在的属性
  space_id: number;
  account_id: number;
  books_count: number;
  public_books_count: number;
  followers_count: number;
  following_count: number;
  public: number;
  _serializer: string;
};
