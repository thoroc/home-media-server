import {
  DOMAIN,
  ENV_FILE_PATH,
  ENVIRONMENT_VARIABLES,
  NETWORK_NAME,
  RESTART_POLICY,
} from '../constants.ts';
import { getServiceAppVolume, getServiceImage } from '../helpers.ts';
import { ServiceType } from '../types.ts';

export const PROWLARR_SERVICE_NAME = 'prowlarr';
export const PROWLARR_INTERNAL_PORT = 9696;
export const PROWLARR_EXTERNAL_PORT = 9696;

export const defaultProwlarrService: ServiceType = {
  serviceName: PROWLARR_SERVICE_NAME,
  image: getServiceImage(PROWLARR_SERVICE_NAME),
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
  envFile: [ENV_FILE_PATH],
  environmentVariables: {
    [`${ENVIRONMENT_VARIABLES.PGID}`]: `\${${ENVIRONMENT_VARIABLES.PGID}}`,
    [`${ENVIRONMENT_VARIABLES.PUID}`]: `\${${ENVIRONMENT_VARIABLES.PUID}}`,
    [`${ENVIRONMENT_VARIABLES.TIMEZONE}`]:
      `\${${ENVIRONMENT_VARIABLES.TIMEZONE}}`,
  },
  ports: {
    [PROWLARR_INTERNAL_PORT]: PROWLARR_EXTERNAL_PORT,
  },
  volumes: getServiceAppVolume(PROWLARR_SERVICE_NAME, {
    withDownloads: true,
    withMovies: true,
  }),
  restartPolicy: RESTART_POLICY.UNLESS_STOPPED,
};
