import { YuqueClient } from 'yuque-client';

const client = new YuqueClient({
  appName: 'demo',
  accessToken: 'xxx',
});

async function start() {
  const user = await client.user.getCurrentUser();
  console.log(user);
}

start().finally(() => {
  console.log('ratelimit', client.ratelimit);
  console.info('done');
});
