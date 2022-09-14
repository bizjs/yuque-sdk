import { YuqueClient } from '../src';
import * as dotenv from 'dotenv';

const config = dotenv.config();

const client = new YuqueClient({
  accessToken: config.parsed?.AccessToken || '',
  appName: 'demo',
});

describe('YuqueClient user apis tests', () => {
  test('getCurrentUser and getSingleUserInfo(user.id) will return same user info', async () => {
    const user = await client.user.getCurrentUser();
    const user2 = await client.user.getSingleUserInfo(user.id);
    expect(user).toStrictEqual(user2);
  });
});
