/**
 * 原 BookDetailSerializer
 * https://www.yuque.com/yuque/developer/bookdetailserializer
 */
export type RepoDetailSerializer = {};

/**
 * 原 BookSerializer
 * https://www.yuque.com/yuque/developer/bookserializer
 */
export type RepoSerializer = {};

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
