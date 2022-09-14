export type DocSerializer = {
  id: number;
  /**
   * 文档路径
   */
  slug: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 文档创建人 ID
   */
  user_id: number;
  /**
   *  描述了正文的格式 [asl, markdown, lake]
   */
  format: string;
  /**
   * 是否公开 [1 - 公开, 0 - 私密]
   */
  public: number;
  /**
   * 状态 [1 - 正常, 0 - 草稿]
   */
  status: number;
  /**
   * 喜欢数量
   */
  likes_count: number;
  /**
   * 评论数量
   */
  comments_count: number;
  /**
   * 文档内容更新时间
   */
  content_updated_at: string;
  /**
   * 创建时间
   */
  created_at: string;
  /**
   * 更新时间
   */
  updated_at: string;

  // 其他文档上无的属性
  description: string;
  book_id: number;
  read_count: number; // 阅读量
  first_published_at: string;
  published_at: string;
  word_count: number;
  cover: string; // 封面图地址
  view_status: number;
  read_status: number;
  draft_version: number;
  last_editor_id: number;
  custom_description: string;
  _serializer: 'v2.doc';
  last_editor: any[];
};

export type DocDetailSerializer = {};

export type CreateDocRequest = {
  /**
   * 标题
   */
  title: string;
  /**
   * 文档 Slug
   */
  slug?: string;
  /**
   * 支持 markdown、lake、html，默认为 markdown
   */
  format: 'markdown' | 'lake' | 'html';
  /**
   * format 描述的正文内容，最大允许 5MB
   */
  body: string;
};

export type DocUpdateRequest = {
  /**
   * 标题
   */
  title?: string;
  /**
   * 文档 Slug
   */
  slug?: string;
  /**
   * 已发布的正文 Markdown，这个字段必传
   */
  body: string;
  /**
   * 如果在页面编辑过文档，那这时文档会转成 lake 格式，如果再用 markdown 无法进行更新，这是需要添加
  _force_asl = 1 来确保内容的正确转换。
   */
  _force_asl: number;
};
