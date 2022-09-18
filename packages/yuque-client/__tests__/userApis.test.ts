import { getClient } from './utils';

describe('YuqueClient user apis tests', () => {
  const client = getClient();
  test('getCurrentUser and getSingleUserInfo(user.id) should return same user info', async () => {
    // 查询当前用户
    const user = await client.user.getCurrentUser();
    // 通过 id 查用户
    const user2 = await client.user.getSingleUserInfo(user.id);
    // 通过 login 查用户
    const user3 = await client.user.getSingleUserInfo(user.login);

    // 这三个用户对象要值相等
    expect(user.id).toStrictEqual(user2.id);
    expect(user2.name).toStrictEqual(user3.name);

    expect(user.type).toBe('User');
  });
});
