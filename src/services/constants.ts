import { environmentVariables } from './types.ts';

export const DEFAULT_ENVIRONMENT_VARIABLES = {
  [environmentVariables.PUID]: `\${${environmentVariables.PUID}}`,
  [environmentVariables.PGID]: `\${${environmentVariables.PGID}}`,
  [environmentVariables.TIMEZONE]: `\${${environmentVariables.TIMEZONE}}`,
};

export const NETWORK_NAME = 'high-seas';
export const DOMAIN = 'lan';
export const ENV_FILE_PATH = '../../.env';
export const volumes = {
  DOCKER_SOCKET: '/var/run/docker.sock',
  LOCAL_DATA_DOWNLOADS: '${HMS_DIR}/data/downloads',
  LOCAL_DATA_MEDIA: '${HMS_DIR}/data/media',
  LOCAL_DATA_MEDIA_MOVIES: '${HMS_DIR}/data/media/movies',
  LOCAL_DATA_MEDIA_TVSHOWS: '${HMS_DIR}/data/media/tv_shows',
  LOCAL_DATA_MEDIA_MUSIC: '${HMS_DIR}/data/media/music',
  LOCAL_DATA_TRANSCODE: '${HMS_DIR}/data/transcode',
  localAppdir: (serviceName: string) => `\${HMS_DIR}/apps/${serviceName}`,
};
