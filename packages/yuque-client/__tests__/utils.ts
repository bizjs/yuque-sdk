import { YuqueClient } from '../src';
import * as dotenv from 'dotenv';

const config = dotenv.config();

export function getClient(name = 'www') {
  const client = new YuqueClient({
    accessToken: config.parsed?.AccessToken || '',
    appName: 'demo',
    apiHost: `https://${name}.yuque.com/api/v2`,
  });
  return client;
}

describe('', () => {
  test.todo('');
});
