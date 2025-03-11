import {
  DEFAULT_ENVIRONMENT_VARIABLES,
  DOMAIN,
  ENV_FILE_PATH,
  NETWORK_NAME,
} from '../constants.ts';
import { restartPolicy, ServiceType } from '../types.ts';
import {
  getServiceAppVolume,
  getServiceImage,
  getTraefikLabels,
} from './helpers.ts';

export const QBITTORRENT_SERVICE_NAME = 'qbittorrent';
export const QBITTORRENT_INTERNAL_PORT1 = 8080;
export const QBITTORRENT_EXTERNAL_PORT1 = 8080;
export const QBITTORRENT_INTERNAL_PORT2 = 6881;
export const QBITTORRENT_EXTERNAL_PORT2 = 6881;
export const QBITTORRENT_INTERNAL_PORT3 = 6881;
export const QBITTORRENT_EXTERNAL_PORT3 = '6881/udp';

export const defaultQbittorrentService: ServiceType = {
  serviceName: QBITTORRENT_SERVICE_NAME,
  image: getServiceImage(QBITTORRENT_SERVICE_NAME),
  containerName: QBITTORRENT_SERVICE_NAME,
  hostname: `${QBITTORRENT_SERVICE_NAME}.${DOMAIN}`,
  labels: getTraefikLabels(
    QBITTORRENT_SERVICE_NAME,
    QBITTORRENT_INTERNAL_PORT1,
  ),
  networks: [NETWORK_NAME],
  envFile: [ENV_FILE_PATH],
  environmentVariables: DEFAULT_ENVIRONMENT_VARIABLES,
  ports: [
    `${QBITTORRENT_INTERNAL_PORT1}:${QBITTORRENT_EXTERNAL_PORT1}`,
    `${QBITTORRENT_INTERNAL_PORT2}:${QBITTORRENT_EXTERNAL_PORT2}`,
    `${QBITTORRENT_INTERNAL_PORT3}:${QBITTORRENT_EXTERNAL_PORT3}`,
  ],
  volumes: getServiceAppVolume(QBITTORRENT_SERVICE_NAME, {
    withDownloads: true,
  }),
  restartPolicy: restartPolicy.UNLESS_STOPPED,
};
