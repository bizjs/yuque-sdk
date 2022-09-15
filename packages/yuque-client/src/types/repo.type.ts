import type { UserSerializer } from './user.type';

/**
 * 原 BookSerializer，知识库
 * _serializer= "v2.book"
 * https://www.yuque.com/yuque/developer/bookserializer
 */
export type RepoSerializer = {
  id: number;
  /**
   * 知识库类型， Book（文档），Thread（话题），Design（画板）
   */
  type: 'Book' | 'Thread' | 'Design';
  slug: string;
  name: string;
  /**
   * 所属的团队/用户编号
   */
  user_id: string;

  description: string;

  /**
   * 创建者 ID
   */
  creator_id: number;

  /**
   * 知识库可见性，0 私密, 1 所有人可见, 2 空间成员可见, 3 空间所有人（含外部联系人）可见, 4 知识库成员可见
   */
  public: number;

  /**
   * 文档数量
   */
  items_count: 54;
  likes_count: 0;
  /**
   * 被 watch 数量
   */
  watches_count: number;
  content_updated_at: string;
  updated_at: string;
  created_at: string;
  /**
   * 知识库的 namespace，一般是：团队/知识库
   */
  namespace: string;
  /**
   * 用户或组织信息
   */
  user: UserSerializer | null;
};

/**
 * 原 BookDetailSerializer
 * _serializer= "v2.book_detail"
 * https://www.yuque.com/yuque/developer/bookdetailserializer
 */
export type RepoDetailSerializer = RepoSerializer & {
  toc: string | null;
  toc_yml: string | null;
  pinned_at: string | null;
  archived_at: string | null;
};

export type RepoUpdateRequest = {
  /**
   * 名称
   */
  name?: string;

  /**
   * ID
   */
  slug?: string;

  /**
   * 知识库描述
   */
  description?: string;

  /**
   * 知识库可见性，默认 1
   * 0 私密, 1 所有人可见, 2 空间成员可见, 3 空间所有人（含外部联系人）可见, 4 知识库成员可见
   */
  public?: number;
};

export type RepoCreateRequest = {
  /**
   * 名称
   */
  name: string;

  /**
   * ID
   */
  slug: string;

  /**
   * 知识库描述
   */
  description?: string;

  /**
   * 知识库可见性，默认 1
   * 0 私密, 1 所有人可见, 2 空间成员可见, 3 空间所有人（含外部联系人）可见, 4 知识库成员可见
   */
  public?: number;
  /**
   * 知识库类型，默认 Book， Book - 文库， Design - 画板
   */
  type?: 'Book' | 'Design';
};
