import { ONE_DAY } from "@/utils";
/**
 * This is a hack from Github discussion.
 *
 * @see https://github.com/nextauthjs/next-auth/issues/596#issuecomment-943453568
 */
 export function reloadSession() {
  const event = new Event('visibilitychange');
  document.dispatchEvent(event);
}

/**
 * #alternative:
 */
export function refreshSession() {
  const message = { event: 'session', data: { trigger: 'getSession' } };
  localStorage.setItem(
    'nextauth.message',
    JSON.stringify({ ...message, timestamp: Math.floor(Date.now() / 1000) })
  );
}

export const maxAge = 30 * ONE_DAY;
