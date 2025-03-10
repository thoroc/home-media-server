import {
  DOMAIN,
  ENVIRONMENT_VARIABLES,
  NETWORK_NAME,
  RESTART_POLICY,
} from '../constants.ts';
import { ServiceType } from '../types.ts';

export const RADARR_NAME = 'radarr';
export const RADARR_IMAGE = 'lscr.io/linuxserver/radarr:latest';
export const RADARR_INTERNAL_PORT = 7878;
export const RADARR_EXTERNAL_PORT = 7878;

export const defaultRadarrService: ServiceType = {
  serviceName: RADARR_NAME,
  image: RADARR_IMAGE,
  containerName: RADARR_NAME,
  hostname: `${RADARR_NAME}.${DOMAIN}`,
  labels: {
    'traefik.enable': 'true',
    [`traefik.http.routers.${RADARR_NAME}.rule`]:
      `Host(\`${RADARR_NAME}.${DOMAIN}\`)`,
    [`traefik.http.services.${RADARR_NAME}.loadbalancer.server.port`]:
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
    [`\${HMS_DIR}/apps/${RADARR_NAME}`]: '/config',
    '${HMS_DIR}/data/downloads': '/mnt/downloads',
    '${HMS_DIR}/data/media/movies': '/mnt/media',
  },
  restartPolicy: RESTART_POLICY.UNLESS_STOPPED,
};
