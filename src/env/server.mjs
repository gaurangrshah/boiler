// @ts-check

/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported there.
 */
import { debug as globalDebug,dev } from '@/utils';
import { env as clientEnv,formatErrors } from "./client.mjs";
import { serverSchema } from "./schema.mjs";

const debug = globalDebug || true;

const _serverEnv = serverSchema.safeParse(process.env);

if (!_serverEnv.success) {
  dev.error(
    "❌ Invalid environment variables:\n",
    ...formatErrors(_serverEnv.error.format()),
    debug
  );
  throw new Error("Invalid environment variables");
}

for (let key of Object.keys(_serverEnv.data)) {
  if (key.startsWith("NEXT_PUBLIC_")) {
    dev.error("❌ You are exposing a server-side env-variable:", key, debug);

    throw new Error("You are exposing a server-side env-variable");
  }
}

export const env = { ..._serverEnv.data, ...clientEnv };
