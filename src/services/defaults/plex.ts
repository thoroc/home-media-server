import {
  DEFAULT_ENVIRONMENT_VARIABLES,
  DOMAIN,
  ENV_FILE_PATH,
  NETWORK_NAME,
  volumes,
} from '../constants.ts';
import { restartPolicy, ServiceType } from '../types.ts';
import { getTraefikLabels } from './helpers.ts';

export const PLEX_SERVICE_NAME = 'plexms';
export const PLEX_INTERNAL_PORT = 32400;
export const PLEX_EXTERNAL_PORT = 32400;

export const defaultPlexService: ServiceType = {
  serviceName: PLEX_SERVICE_NAME,
  image: 'plexinc/pms-docker',
  containerName: PLEX_SERVICE_NAME,
  hostname: `${PLEX_SERVICE_NAME}.${DOMAIN}`,
  labels: getTraefikLabels(PLEX_SERVICE_NAME, PLEX_INTERNAL_PORT),
  networks: [NETWORK_NAME],
  envFile: [ENV_FILE_PATH],
  environmentVariables: {
    ...DEFAULT_ENVIRONMENT_VARIABLES,
    PLEX_CLAIM: '${PLEX_CLAIM}',
    PLEX_UID: '${PUID}',
    PLEX_GID: '${PGID}',
    HOSTNAME: 'PlexServer',
    ALLOWED_NETWORKS: '${LOCAL_NETWORK}',
  },
  ports: {
    32400: '32400/tcp',
    3005: '3005/tcp',
    8324: '8324/tcp',
    32469: '32469/tcp',
    1900: '1900/udp',
    32410: '32410/udp',
    32412: '32412/udp',
    32413: '32413/udp',
    32414: '32414/udp',
  },
  volumes: {
    [`${volumes.localAppdir(PLEX_SERVICE_NAME)}/config`]: '/config',
    [volumes.LOCAL_DATA_TRANSCODE]: '/transcode',
    [volumes.LOCAL_DATA_MEDIA]: '/data/media',
  },
  restartPolicy: restartPolicy.UNLESS_STOPPED,
};
