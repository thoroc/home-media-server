import {
  DOMAIN,
  ENV_FILE_PATH,
  ENVIRONMENT_VARIABLES,
  NETWORK_NAME,
  RESTART_POLICY,
} from '../constants.ts';
import { getServiceAppVolume, getServiceImage } from '../helpers.ts';
import { ServiceType } from '../types.ts';

export const BAZARR_SERVICE_NAME = 'bazarr';
export const BAZARR_INTERNAL_PORT = 6767;
export const BAZARR_EXTERNAL_PORT = 6767;

export const defaultBazarrService: ServiceType = {
  serviceName: BAZARR_SERVICE_NAME,
  image: getServiceImage(BAZARR_SERVICE_NAME),
  containerName: BAZARR_SERVICE_NAME,
  hostname: `${BAZARR_SERVICE_NAME}.${DOMAIN}`,
  labels: {
    'traefik.enable': 'true',
    [`traefik.http.routers.${BAZARR_SERVICE_NAME}.rule`]:
      `Host(\`${BAZARR_SERVICE_NAME}.${DOMAIN}\`)`,
    [`traefik.http.services.${BAZARR_SERVICE_NAME}.loadbalancer.server.port`]:
      BAZARR_INTERNAL_PORT,
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
    [BAZARR_INTERNAL_PORT]: BAZARR_EXTERNAL_PORT,
  },
  volumes: getServiceAppVolume(BAZARR_SERVICE_NAME, {
    withMedia: true,
  }),
  restartPolicy: RESTART_POLICY.UNLESS_STOPPED,
};
