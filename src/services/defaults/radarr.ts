import {
  DOMAIN,
  ENVIRONMENT_VARIABLES,
  NETWORK_NAME,
  RESTART_POLICY,
} from '../constants.ts';
import { ServiceType } from '../types.ts';

export const RADARR_SERVICE_NAME = 'radarr';
export const RADARR_IMAGE = 'lscr.io/linuxserver/radarr:latest';
export const RADARR_INTERNAL_PORT = 7878;
export const RADARR_EXTERNAL_PORT = 7878;

export const defaultRadarrService: ServiceType = {
  serviceName: RADARR_SERVICE_NAME,
  image: RADARR_IMAGE,
  containerName: RADARR_SERVICE_NAME,
  hostname: `${RADARR_SERVICE_NAME}.${DOMAIN}`,
  labels: {
    'traefik.enable': 'true',
    [`traefik.http.routers.${RADARR_SERVICE_NAME}.rule`]:
      `Host(\`${RADARR_SERVICE_NAME}.${DOMAIN}\`)`,
    [`traefik.http.services.${RADARR_SERVICE_NAME}.loadbalancer.server.port`]:
      RADARR_INTERNAL_PORT,
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
    [RADARR_INTERNAL_PORT]: RADARR_EXTERNAL_PORT,
  },
  volumes: {
    [`\${HMS_DIR}/apps/${RADARR_SERVICE_NAME}`]: '/config',
    '${HMS_DIR}/data/downloads': '/mnt/downloads',
    '${HMS_DIR}/data/media/movies': '/mnt/media',
  },
  restartPolicy: RESTART_POLICY.UNLESS_STOPPED,
};
