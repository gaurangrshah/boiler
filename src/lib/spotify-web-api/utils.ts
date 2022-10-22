import { dev } from '@/utils/logger';

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
  dev.log('fn:getNextCursor', nextCursor);
  return nextCursor;
}
