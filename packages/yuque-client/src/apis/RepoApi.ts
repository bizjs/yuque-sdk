import { RepoSerializer, RepoUpdateRequest, RepoCreateRequest } from '../types/repo.type';
import { YuqueAPIBase } from './YuqueAPIBase';

export class RepoApi extends YuqueAPIBase {
  queryUserRepos(userIdOrLoginId: string | number): Promise<RepoSerializer[]> {
    return this.get<RepoSerializer[]>(`/users/${userIdOrLoginId}/repos`);
  }

  queryGroupRepos(groupIdOrGroupSlug: string | number) {
    return this.get(`/groups/${groupIdOrGroupSlug}/repos`);
  }

  createUserRepo(userIdOrLoginId: string | number, repoCreateRequest: RepoCreateRequest) {
    return this.post(`/users/${userIdOrLoginId}/repos`, repoCreateRequest);
  }

  createGroupRepo(groupIdOrGroupSlug: string | number, repoCreateRequest: RepoCreateRequest) {
    return this.post(`/groups/${groupIdOrGroupSlug}/repos`, repoCreateRequest);
  }

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
