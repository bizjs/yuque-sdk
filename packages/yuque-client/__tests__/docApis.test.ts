import { getClient } from './utils';

describe('YuqueClient doc apis tests', () => {
  const client = getClient();
  test('query doc list', async () => {
    const docList = await client.doc.queryDocs('hstarorg/docs');
  });
});
