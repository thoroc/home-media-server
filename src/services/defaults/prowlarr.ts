import {
  DOMAIN,
  ENVIRONMENT_VARIABLES,
  NETWORK_NAME,
  RESTART_POLICY,
} from '../constants.ts';
import { ServiceType } from '../types.ts';

export const PROWLARR_SERVICE_NAME = 'prowlarr';
export const PROWLARR_IMAGE = 'lscr.io/linuxserver/prowlarr:latest';
export const PROWLARR_INTERNAL_PORT = 9696;
export const PROWLARR_EXTERNAL_PORT = 9696;

export const defaultProwlarrService: ServiceType = {
  serviceName: PROWLARR_SERVICE_NAME,
  image: PROWLARR_IMAGE,
  containerName: PROWLARR_SERVICE_NAME,
  hostname: `${PROWLARR_SERVICE_NAME}.${DOMAIN}`,
  labels: {
    'traefik.enable': 'true',
    [`traefik.http.routers.${PROWLARR_SERVICE_NAME}.rule`]:
      `Host(\`${PROWLARR_SERVICE_NAME}.${DOMAIN}\`)`,
    [`traefik.http.services.${PROWLARR_SERVICE_NAME}.loadbalancer.server.port`]:
      PROWLARR_INTERNAL_PORT,
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
    [PROWLARR_INTERNAL_PORT]: PROWLARR_EXTERNAL_PORT,
  },
  volumes: {
    [`\${HMS_DIR}/apps/${PROWLARR_SERVICE_NAME}`]: '/config',
    '${HMS_DIR}/data/downloads': '/mnt/downloads',
    '${HMS_DIR}/data/media/movies': '/mnt/media',
  },
  restartPolicy: RESTART_POLICY.UNLESS_STOPPED,
};
