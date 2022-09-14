import { YuqueClient } from '../src';
import * as dotenv from 'dotenv';

const config = dotenv.config();

const client = new YuqueClient({
  accessToken: config.parsed?.AccessToken || '',
  appName: 'demo',
});

describe('YuqueClient doc apis tests', () => {
  test('query doc list', async () => {
    const docList = await client.doc.queryDocList('hstarorg/docs');
    console.log(docList);
  });
});
