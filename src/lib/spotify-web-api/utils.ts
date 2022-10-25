import { debug as globalDebug, dev } from '@/utils';

const debug = globalDebug || false;

export function getNextCursor(
  limit: number,
  cursor: number,
  total: number
): number | undefined {
  let nextCursor: number | undefined = undefined;
  if (cursor === 0) {
    nextCursor = 1;
  } else {
    nextCursor = cursor + 1;
  }
  if (cursor * limit > total) {
    nextCursor = undefined;
  }
  dev.log('fn:getNextCursor', nextCursor, debug);
  return nextCursor;
}
