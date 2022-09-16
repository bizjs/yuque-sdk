import type { IdOrKey } from '../types/lib.type';
import type { RepoSerializer, RepoUpdateRequest, RepoCreateRequest, RepoDetailSerializer } from '../types/repo.type';
import { YuqueAPIBase } from './YuqueAPIBase';

/**
 * 知识库类 API 实现
 * https://www.yuque.com/yuque/developer/repo
 */
export class RepoApi extends YuqueAPIBase {
  /**
   * 查询用户下的知识库列表
   * @param userIdOrLogin
   * @returns
   */
  queryUserRepos(userIdOrLogin: IdOrKey) {
    return this.get<RepoSerializer[]>(`/users/${userIdOrLogin}/repos`);
  }

  /**
   * 查询组织（团队）下的知识库列表
   * @param groupIdOrGroupSlug
   * @returns
   */
  queryGroupRepos(groupIdOrGroupSlug: IdOrKey) {
    return this.get<RepoSerializer[]>(`/groups/${groupIdOrGroupSlug}/repos`);
  }

  /**
   * 创建知识库
   * @param userIdOrLoginId 用户ID
   * @param repoCreateRequest 创建知识库的数据
   * @returns
   */
  createUserRepo(userIdOrLoginId: IdOrKey, repoCreateRequest: RepoCreateRequest) {
    return this.post<RepoSerializer>(`/users/${userIdOrLoginId}/repos`, repoCreateRequest);
  }

  /**
   * 创建知识库
   * @param groupIdOrGroupSlug 团队 ID 或 slug
   * @param repoCreateRequest 创建知识库的数据
   * @see {@link createUserRepo}
   * @returns
   */
  createGroupRepo(groupIdOrGroupSlug: IdOrKey, repoCreateRequest: RepoCreateRequest) {
    return this.post<RepoSerializer>(`/groups/${groupIdOrGroupSlug}/repos`, repoCreateRequest);
  }

  /**
   * 查询知识库详情
   * @param repoIdOrNamespace Namespace 结构：group/repo
   * @returns
   */
  getRepoDetail(repoIdOrNamespace: IdOrKey) {
    return this.get<RepoDetailSerializer>(`/repos/${repoIdOrNamespace}`);
  }

  /**
   * 更新 Repo
   * @param repoIdOrNamespace 知识库ID 或者 namespace
   * @param repoUpdateRequest
   * @returns
   */
  updateRepo(repoIdOrNamespace: IdOrKey, repoUpdateRequest: RepoUpdateRequest) {
    return this.put<RepoDetailSerializer>(`/repos/${repoIdOrNamespace}`, repoUpdateRequest);
  }

  /**
   * 删除知识库
   * @param repoIdOrNamespace 知识库ID 或者 namespace
   * @returns
   */
  deleteRepo(repoIdOrNamespace: IdOrKey) {
    return this.delete<RepoDetailSerializer>(`/repos/${repoIdOrNamespace}`);
  }
}
