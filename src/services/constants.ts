import { environmentVariables } from './types.ts';

export const DEFAULT_ENVIRONMENT_VARIABLES = {
  [environmentVariables.PUID]: `\${${environmentVariables.PUID}}`,
  [environmentVariables.PGID]: `\${${environmentVariables.PGID}}`,
  [environmentVariables.TIMEZONE]: `\${${environmentVariables.TIMEZONE}}`,
};

export const NETWORK_NAME = 'high-seas';
export const DOMAIN = 'lan';
export const ENV_FILE_PATH = '../../.env';
