import {
  DOMAIN,
  ENVIRONMENT_VARIABLES,
  NETWORK_NAME,
  RESTART_POLICY,
} from '../constants.ts';
import { ServiceType } from '../types.ts';

export const LIDARR_SERVICE_NAME = 'lidarr';
export const LIDARR_IMAGE = 'lscr.io/linuxserver/lidarr:latest';
export const LIDARR_INTERNAL_PORT = 8686;
export const LIDARR_EXTERNAL_PORT = 8686;

export const defaultLidarrService: ServiceType = {
  serviceName: LIDARR_SERVICE_NAME,
  image: LIDARR_IMAGE,
  containerName: LIDARR_SERVICE_NAME,
  hostname: `${LIDARR_SERVICE_NAME}.${DOMAIN}`,
  labels: {
    'traefik.enable': 'true',
    [`traefik.http.routers.${LIDARR_SERVICE_NAME}.rule`]:
      `Host(\`${LIDARR_SERVICE_NAME}.${DOMAIN}\`)`,
    [`traefik.http.services.${LIDARR_SERVICE_NAME}.loadbalancer.server.port`]:
      LIDARR_INTERNAL_PORT,
  },
  networks: [NETWORK_NAME],
  envFile: '../../.env',
  environmentVariables: {
    [`${ENVIRONMENT_VARIABLES.PGID}`]: `\${${ENVIRONMENT_VARIABLES.PGID}}`,
    [`${ENVIRONMENT_VARIABLES.PUID}`]: `\${${ENVIRONMENT_VARIABLES.PUID}}`,
    [`${ENVIRONMENT_VARIABLES.TIMEZONE}`]:
      `\${${ENVIRONMENT_VARIABLES.TIMEZONE}}`,
  },
  ports: {
    [LIDARR_INTERNAL_PORT]: LIDARR_EXTERNAL_PORT,
  },
  volumes: {
    [`\${HMS_DIR}/apps/${LIDARR_SERVICE_NAME}`]: '/config',
    '${HMS_DIR}/data/media': '/mnt/media',
  },
  restartPolicy: RESTART_POLICY.UNLESS_STOPPED,
};
