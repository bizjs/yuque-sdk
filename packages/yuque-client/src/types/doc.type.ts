import { RepoSerializer } from './repo.type';
import type { UserSerializer } from './user.type';

/**
 * 文档模型
 * _serializer = "v2.doc"
 */
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
   * 文档描述
   */
  description: string;

  /**
   * 文档创建人 ID
   */
  user_id: number;

  /**
   * 知识库 ID
   */
  book_id: number;
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

  /**
   * 阅读量
   */
  read_count: number;
  first_published_at: string;
  published_at: string;
  /**
   * 字数
   */
  word_count: number;
  /**
   * 封面图地址
   */
  cover: string;
  view_status: number;
  read_status: number;
  draft_version: number;
  last_editor_id: number;
  /**
   * 自定义描述
   */
  custom_description: string;
  /**
   * 最后编辑者信息
   */
  last_editor: UserSerializer;
  book?: RepoSerializer;
  /**
   * optional_properties = hits 时出现，表示阅读量
   */
  hits?: number;
};

/**
 * 文档详情
 * _serializer = "v2.doc_detail"
 */
export type DocDetailSerializer = DocSerializer & {
  creator?: UserSerializer;
  deleted_at: string | null;
  body: string;
  body_lake: string;
  body_draft: string;
  body_draft_lake: string;

  /**
   * 可直接展示用的语雀文档 HTML
   */
  body_html: string;
};

export type CreateDocRequest = {
  /**
   * 标题，不传默认为”未命名“
   */
  title?: string;
  /**
   * 文档 Slug
   */
  slug?: string;
  /**
   * 支持 markdown、lake、html，默认为 markdown
   */
  format?: 'markdown' | 'lake' | 'html';
  /**
   * format 描述的正文内容，最大允许 5MB
   */
  body?: string;
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
  body?: string;
  /**
   * 如果在页面编辑过文档，那这时文档会转成 lake 格式，如果再用 markdown 无法进行更新，这是需要添加
  _force_asl = 1 来确保内容的正确转换。
   */
  _force_asl?: number;
};
