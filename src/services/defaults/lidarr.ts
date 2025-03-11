import {
  DOMAIN,
  ENV_FILE_PATH,
  ENVIRONMENT_VARIABLES,
  NETWORK_NAME,
  RESTART_POLICY,
} from '../constants.ts';
import { getServiceAppVolume, getServiceImage } from '../helpers.ts';
import { ServiceType } from '../types.ts';

export const LIDARR_SERVICE_NAME = 'lidarr';
export const LIDARR_INTERNAL_PORT = 8686;
export const LIDARR_EXTERNAL_PORT = 8686;

export const defaultLidarrService: ServiceType = {
  serviceName: LIDARR_SERVICE_NAME,
  image: getServiceImage(LIDARR_SERVICE_NAME),
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
  envFile: [ENV_FILE_PATH],
  environmentVariables: {
    [`${ENVIRONMENT_VARIABLES.PGID}`]: `\${${ENVIRONMENT_VARIABLES.PGID}}`,
    [`${ENVIRONMENT_VARIABLES.PUID}`]: `\${${ENVIRONMENT_VARIABLES.PUID}}`,
    [`${ENVIRONMENT_VARIABLES.TIMEZONE}`]:
      `\${${ENVIRONMENT_VARIABLES.TIMEZONE}}`,
  },
  ports: {
    [LIDARR_INTERNAL_PORT]: LIDARR_EXTERNAL_PORT,
  },
  volumes: getServiceAppVolume(LIDARR_SERVICE_NAME, {
    withMedia: true,
  }),
  restartPolicy: RESTART_POLICY.UNLESS_STOPPED,
};
