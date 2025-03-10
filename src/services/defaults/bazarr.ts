import {
  DOMAIN,
  ENVIRONMENT_VARIABLES,
  NETWORK_NAME,
  RESTART_POLICY,
} from '../constants.ts';
import { ServiceType } from '../types.ts';

export const BAZARR_IMAGE = 'lscr.io/linuxserver/bazarr:latest';
export const BAZARR_INTERNAL_PORT = 6767;
export const BAZARR_EXTERNAL_PORT = 6767;
export const BAZARR_NAME = 'bazarr';

export const defaultBazarrService: ServiceType = {
  serviceName: BAZARR_NAME,
  image: BAZARR_IMAGE,
  containerName: BAZARR_NAME,
  hostname: `${BAZARR_NAME}.${DOMAIN}`,
  labels: {
    'traefik.enable': 'true',
    [`traefik.http.routers.${BAZARR_NAME}.rule`]:
      `Host(\`${BAZARR_NAME}.${DOMAIN}\`)`,
    [`traefik.http.services.${BAZARR_NAME}.loadbalancer.server.port`]:
      BAZARR_INTERNAL_PORT,
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
    [BAZARR_INTERNAL_PORT]: BAZARR_EXTERNAL_PORT,
  },
  volumes: {
    [`\${HMS_DIR}/apps/${BAZARR_NAME}`]: '/config',
    '${HMS_DIR}/data/media': '/mnt/media',
  },
  restartPolicy: RESTART_POLICY.UNLESS_STOPPED,
};
