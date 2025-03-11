import {
  DOMAIN,
  ENVIRONMENT_VARIABLES,
  NETWORK_NAME,
  RESTART_POLICY,
} from '../constants.ts';
import { getServiceAppVolume, getServiceImage } from '../helpers.ts';
import { ServiceType } from '../types.ts';

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
  labels: {
    'traefik.enable': 'true',
    [`traefik.http.routers.${QBITTORRENT_SERVICE_NAME}.rule`]:
      `Host(\`${QBITTORRENT_SERVICE_NAME}.${DOMAIN}\`)`,
    [`traefik.http.services.${QBITTORRENT_SERVICE_NAME}.loadbalancer.server.port`]:
      QBITTORRENT_INTERNAL_PORT1,
  },
  networks: [NETWORK_NAME],
  envFile: '../../.env',
  environmentVariables: {
    [`${ENVIRONMENT_VARIABLES.PGID}`]: `\${${ENVIRONMENT_VARIABLES.PGID}}`,
    [`${ENVIRONMENT_VARIABLES.PUID}`]: `\${${ENVIRONMENT_VARIABLES.PUID}}`,
    [`${ENVIRONMENT_VARIABLES.TIMEZONE}`]:
      `\${${ENVIRONMENT_VARIABLES.TIMEZONE}}`,
  },
  ports: [
    `${QBITTORRENT_INTERNAL_PORT1}:${QBITTORRENT_EXTERNAL_PORT1}`,
    `${QBITTORRENT_INTERNAL_PORT2}:${QBITTORRENT_EXTERNAL_PORT2}`,
    `${QBITTORRENT_INTERNAL_PORT3}:${QBITTORRENT_EXTERNAL_PORT3}`,
  ],
  volumes: getServiceAppVolume(QBITTORRENT_SERVICE_NAME, {
    withDownloads: true,
  }),
  restartPolicy: RESTART_POLICY.UNLESS_STOPPED,
};
