import { getClient } from './utils';

describe('YuqueClient doc apis tests', () => {
  const client = getClient();
  test('query doc list', async () => {
    const docList = await client.doc.queryDocs('hstarorg/docs');
    expect(docList.length).toBeGreaterThan(0);
    expect((docList[0] as any)._serializer === 'v2.doc').toBe(true);
  });

  test('query doc list by paging', async () => {
    const docList = await client.doc.queryDocs('hstarorg/docs', { page: 1, size: 1, includeReadCount: true });
    expect(docList.length).toBe(1);
    // includeReadCount = true 时，会返回阅读量
    expect(docList[0].hits).toBe(docList[0].read_count);
  });
});
