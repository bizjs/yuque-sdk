import { CreateDocRequest, DocDetailSerializer, DocSerializer, DocUpdateRequest } from '../types/doc.type';
import { YuqueAPIBase } from './YuqueAPIBase';

export type QueryDocsOptions = {
  page?: number;
  size?: number;
  includeReadCount?: boolean;
};

/**
 * 文档类 API 实现
 * https://www.yuque.com/yuque/developer/doc
 */
export class DocApi extends YuqueAPIBase {
  /**
   * 查询知识库的文档列表
   * @param repoIdOrName 知识库 ID 或名称
   * @param options 可分页查询，page 当前页码，size 每页记录数（每页默认 200 条）
   * @returns
   */
  queryDocs(repoIdOrName: string | number, options?: QueryDocsOptions): Promise<DocSerializer[]> {
    const opt = { page: 1, size: 200, ...options };
    // query 参数
    const params: Record<string, string | undefined> = {
      offset: String((opt.page - 1) * opt.size),
      limit: String(opt.size),
    };
    if (opt.includeReadCount) {
      params['optional_properties'] = 'hits';
    }

    return this.get<DocSerializer[]>(`/repos/${repoIdOrName}/docs`, { params });
  }

  /**
   * 获取单个文档的明细
   * @param repoIdOrName 知识库 ID 或名称
   * @param idOrSlug 文档 ID 或者 slug
   * @returns
   */
  getDocDetail(repoIdOrName: string | number, idOrSlug: string) {
    return this.get<DocDetailSerializer>(`/repos/${repoIdOrName}/docs/${idOrSlug}`);
  }

  /**
   * 创建文档
   * @param repoIdOrName 知识库 ID 或名称
   * @param docRequest
   * @returns
   */
  createDoc(repoIdOrName: string | number, docCreateRequest: CreateDocRequest) {
    return this.post<DocDetailSerializer>(`/repos/${repoIdOrName}/docs`, docCreateRequest);
  }

  /**
   * 更新文档
   * @param repoIdOrName 知识库 ID 或名称
   * @param docId 必须是文档 ID
   * @param docUpdateRequest 更新内容
   * @returns
   */
  updateDoc(repoIdOrName: string | number, docId: number, docUpdateRequest: DocUpdateRequest) {
    return this.put<DocDetailSerializer>(`/repos/${repoIdOrName}/docs/${docId}`, docUpdateRequest);
  }

  /**
   * 删除文档
   * @param repoIdOrName 知识库 ID 或名称
   * @param docId 必须是文档 ID
   * @returns
   */
  deleteDoc(repoIdOrName: string | number, docId: number) {
    return this.delete<DocDetailSerializer>(`/repos/${repoIdOrName}/docs/${docId}`);
  }
}
