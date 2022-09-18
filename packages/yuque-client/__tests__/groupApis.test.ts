import { getClient } from './utils';

describe('YuqueClient group apis tests', () => {
  const client = getClient();
  test('query user groups', async () => {
    const groups = await client.group.queryUserGroups('hstarorg');
    expect(Array.isArray(groups)).toBe(true);
  });

  // 这个接口非常慢，跳过测试
  test.skip('query user groups', async () => {
    const groups = await client.group.queryPublicGroups();
    expect(groups.length).toBe(0);
  });

  test('group full logic test', async () => {
    // 创建 Group
    const newGroup = await client.group.createGroup({
      name: '幻星的知识小组',
      login: 'hstar-group2',
    });
    expect(newGroup.name).toBe('幻星的知识小组');
    expect(newGroup.books_count).toBe(0);

    // 更新 Group
    const updatedGroup = await client.group.updateGroup(newGroup.login, {
      name: '幻星的知识小组-Updated',
      login: 'hstar-group2-updated',
    });
    expect(updatedGroup.name).toBe('幻星的知识小组-Updated');
    expect(updatedGroup.login).toBe('hstar-group2-updated');

    // 查询 Group 详情
    const detail = await client.group.getGroupDetail(updatedGroup.login);
    expect(detail).toStrictEqual(updatedGroup);

    // 添加成员
    const newUser = await client.group.addOrUpdateGroupUser(detail.id, { userLogin: 'kenan-5xhtg', role: 'memeber' });
    expect(newUser.user_id).toBe(278352);

    // 删除成员

    const delUserResult = await client.group.deleteGroupUser(detail.id, 'kenan-5xhtg');
    expect(delUserResult.user_id).toBe(278352);

    // 删除 Group
    const delGroupResult = await client.group.deleteGroup(detail.id);
    expect(delGroupResult.id).toBe(detail.id);
  });
});
