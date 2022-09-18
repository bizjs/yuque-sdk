import { getClient } from './utils';

describe('YuqueClient repo apis tests', () => {
  const client = getClient('bizlab');

  // https://bizlab.yuque.com/r/staff-rdzqbf/books
  const groupName = 'staff-rdzqbf';
  const namespace = `${groupName}/test-lib`;

  beforeAll(async () => {
    const result = await client.repo.createGroupRepo(groupName, {
      name: '测试知识库',
      slug: 'test-lib',
    });
    console.log('beforeAll: 创建知识库成功', { id: result.id, name: result.name });
  });

  afterAll(async () => {
    const result = await client.repo.deleteRepo(namespace);
    console.log('afterAll: 删除知识库成功', { id: result.id, name: result.name });
  });

  test('query repo list', async () => {
    const repoList = await client.repo.queryUserRepos(groupName);
    const repoList2 = await client.repo.queryGroupRepos(groupName);

    expect(repoList.length).toBe(repoList2.length);

    expect(repoList[0].id).toBe(repoList2[0].id);
  });

  test('get repo detail', async () => {
    const detail = await client.repo.getRepoDetail(namespace);
    const detail2 = await client.repo.getRepoDetail(detail.id);

    expect(detail).toBeTruthy();
    expect(detail).toStrictEqual(detail2);
  });

  test('repo create / update / delete', async () => {
    // Create
    const repo = await client.repo.createGroupRepo(groupName, {
      name: '测试用临时知识库',
      slug: 'temp-lib',
    });
    expect(repo.name).toBe('测试用临时知识库');
    expect(repo.slug).toBe('temp-lib');

    // Update
    const updatedRepo = await client.repo.updateRepo(repo.id, {
      name: '测试用临时知识库 - Update1',
      slug: 'temp-lib-update',
    });
    expect(updatedRepo.name).toBe('测试用临时知识库 - Update1');
    expect(updatedRepo.slug).toBe('temp-lib-update');

    // Get Detail，确认结果
    const detail = await client.repo.getRepoDetail(updatedRepo.id);
    expect(detail.name).toBe('测试用临时知识库 - Update1');
    expect(detail.slug).toBe('temp-lib-update');

    // Delete
    const delResult = await client.repo.deleteRepo(detail.namespace);
    expect(delResult.id).toBe(detail.id);

    // 最后检查
    try {
      await client.repo.getRepoDetail(updatedRepo.id);
    } catch (reason: any) {
      expect(reason.status).toBe(404);
    }
  });
});
