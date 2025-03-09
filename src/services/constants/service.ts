export const ENVIRONMENT_PUID = 'PUID';
export const ENVIRONMENT_PGID = 'PGID';
export const ENVIRONMENT_TIMEZONE = 'TZ';
export const RESTART = {
  ALWAYS: 'always',
  NO: 'no',
  UNLESS_STOPPED: 'unless-stopped',
} as const;
export type RestartType = typeof RESTART[keyof typeof RESTART];
