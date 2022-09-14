import { CreateDocRequest, DocSerializer, DocUpdateRequest } from '../types/doc.type';
import { YuqueAPIBase } from './YuqueAPIBase';

export type QueryDocsOptions = {
  page?: number;
  pageSize?: number;
  includeReadCount?: boolean;
};

export class DocApi extends YuqueAPIBase {
  /**
   * 查询知识库的文档列表
   * @param repoIdOrName 知识库 ID 或名称
   * @param options
   * @returns
   */
  queryDocs(repoIdOrName: string | number, options?: QueryDocsOptions): Promise<DocSerializer[]> {
    const opt = { page: 1, pageSize: 500, ...options };
    // query 参数
    const query: Record<string, string | number> = {};

    return this.get(`/repos/${repoIdOrName}/docs`, { query });
  }

  /**
   * 获取单个文档的明细
   * @param repoIdOrName 知识库 ID 或名称
   * @param slug
   * @returns
   */
  getDocDetail(repoIdOrName: string | number, slug: string) {
    return this.get(`/repos/${repoIdOrName}/docs/${slug}`);
  }

  /**
   * 创建文档
   * @param repoIdOrName 知识库 ID 或名称
   * @param docRequest
   * @returns
   */
  createDoc(repoIdOrName: string | number, docCreateRequest: CreateDocRequest) {
    return this.post(`/repos/${repoIdOrName}/docs`, docCreateRequest);
  }

  /**
   * 更新文档
   * @param repoIdOrName 知识库 ID 或名称
   * @param docId 为
   * @param docUpdateRequest
   * @returns
   */
  updateDoc(repoIdOrName: string | number, docId: number, docUpdateRequest: DocUpdateRequest) {
    return this.put(`/repos/${repoIdOrName}/docs/${docId}`, docUpdateRequest);
  }

  /**
   * 删除文档
   * @param repoIdOrName 知识库 ID 或名称
   * @param docId
   * @returns
   */
  deleteDoc(repoIdOrName: string | number, docId: number) {
    return this.delete(`/repos/${repoIdOrName}/docs/${docId}`);
  }
}
