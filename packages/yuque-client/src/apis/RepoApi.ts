import type { IdOrLogin } from '../types/lib.type';
import type { RepoSerializer, RepoUpdateRequest, RepoCreateRequest } from '../types/repo.type';
import { YuqueAPIBase } from './YuqueAPIBase';

export class RepoApi extends YuqueAPIBase {
  queryUserRepos(userIdOrLoginId: string | number): Promise<RepoSerializer[]> {
    return this.get<RepoSerializer[]>(`/users/${userIdOrLoginId}/repos`);
  }

  queryGroupRepos(groupIdOrGroupSlug: IdOrLogin) {
    return this.get(`/groups/${groupIdOrGroupSlug}/repos`);
  }

  /**
   * 创建知识库
   * @param userIdOrLoginId 用户ID
   * @param repoCreateRequest 创建知识库的数据
   * @returns
   */
  createUserRepo(userIdOrLoginId: IdOrLogin, repoCreateRequest: RepoCreateRequest) {
    return this.post(`/users/${userIdOrLoginId}/repos`, repoCreateRequest);
  }

  /**
   * 创建知识库
   * @param groupIdOrGroupSlug 团队 ID 或 slug
   * @param repoCreateRequest 创建知识库的数据
   * @see {@link createUserRepo}
   * @returns
   */
  createGroupRepo(groupIdOrGroupSlug: IdOrLogin, repoCreateRequest: RepoCreateRequest) {
    return this.post(`/groups/${groupIdOrGroupSlug}/repos`, repoCreateRequest);
  }

  /**
   * 查询知识库详情
   * @param repoIdOrName Name 结构：group/repo
   * @returns
   */
  getRepoDetail(repoIdOrName: string) {
    return this.get(`/repos/${repoIdOrName}`);
  }

  updateRepo(repoIdOrName: string, repoUpdateRequest: RepoUpdateRequest) {
    return this.put(`/repos/${repoIdOrName}`, repoUpdateRequest);
  }

  deleteRepo(repoIdOrName: string) {
    return this.delete(`/repos/${repoIdOrName}`);
  }
}
