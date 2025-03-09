export const ENVIRONMENT_VARIABLES = {
  PUID: 'PUID',
  PGID: 'PGID',
  TIMEZONE: 'TZ',
} as const;
export type EnvironmentVariableType =
  typeof ENVIRONMENT_VARIABLES[keyof typeof ENVIRONMENT_VARIABLES];

export const DEFAULT_ENVIRONMENT_VARIABLES = [
  `${ENVIRONMENT_VARIABLES.PUID}=\${${ENVIRONMENT_VARIABLES.PUID}}`,
  `${ENVIRONMENT_VARIABLES.PGID}=\${${ENVIRONMENT_VARIABLES.PGID}}`,
  `${ENVIRONMENT_VARIABLES.TIMEZONE}=\${${ENVIRONMENT_VARIABLES.TIMEZONE}}`,
] as const;

export const RESTART_POLICY = {
  ALWAYS: 'always',
  NO: 'no',
  UNLESS_STOPPED: 'unless-stopped',
  ON_FAILURE: 'on-failure',
} as const;
export type RestartPolicyType =
  typeof RESTART_POLICY[keyof typeof RESTART_POLICY];

export const NETWORK_NAME = 'high-seas';
