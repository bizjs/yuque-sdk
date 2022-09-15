import createDebug from 'debug';

const debug = createDebug('yuque:client');

export function log(message: string, ...args: any[]) {
  debug(message, ...args);
}
