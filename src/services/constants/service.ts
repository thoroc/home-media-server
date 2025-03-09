export const ENVIRONMENT_PUID = 'PUID';
export const ENVIRONMENT_PGID = 'PGID';
export const ENVIRONMENT_TIMEZONE = 'TZ';
export const DEFAULT_ENVIRONMENT_VARIABLES = [
  `${ENVIRONMENT_PUID}=${ENVIRONMENT_PUID}`,
  `${ENVIRONMENT_PGID}=${ENVIRONMENT_PUID}`,
  `${ENVIRONMENT_TIMEZONE}=${ENVIRONMENT_PUID}`,
] as const;

export const RESTART_POLICY = {
  ALWAYS: 'always',
  NO: 'no',
  UNLESS_STOPPED: 'unless-stopped',
  ON_FAILURE: 'on-failure',
} as const;
export type RestartPolicyType =
  typeof RESTART_POLICY[keyof typeof RESTART_POLICY];
