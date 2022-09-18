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

  test('query detail', async () => {
    const slug = 'ug5sqf';
    const detail = await client.doc.getDocDetail('hstarorg/docs', slug);
    expect(detail.slug).toBe(slug);
  });

  test('doc create / update /delete test', async () => {
    const repo = 'staff-rdzqbf/rym8ml';
    const client = getClient('bizlab');

    // Create
    const newDoc = await client.doc.createDoc(repo, {
      title: 'Hello',
    });
    expect(newDoc.title).toBe('Hello');

    // Update
    const updatedDoc = await client.doc.updateDoc(repo, newDoc.id, {
      title: 'Hello-Updated',
    });
    expect(updatedDoc.title).toBe('Hello-Updated');

    // Delete
    const delResult = await client.doc.deleteDoc(repo, newDoc.id);
    expect(delResult.deleted_at).toBeTruthy();

    // Query detail 不存在
    try {
      await client.doc.getDocDetail(repo, newDoc.slug);
    } catch (reason: any) {
      expect(reason.status).toBe(404);
    }
  });
});
