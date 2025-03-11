import {
  DOMAIN,
  ENV_FILE_PATH,
  ENVIRONMENT_VARIABLES,
  NETWORK_NAME,
  RESTART_POLICY,
} from '../constants.ts';
import { getServiceAppVolume, getServiceImage } from '../helpers.ts';
import { ServiceType } from '../types.ts';

export const SONARR_SERVICE_NAME = 'sonarr';
export const SONARR_INTERNAL_PORT = 8989;
export const SONARR_EXTERNAL_PORT = 8989;

export const defaultSonarrService: ServiceType = {
  serviceName: SONARR_SERVICE_NAME,
  image: getServiceImage(SONARR_SERVICE_NAME),
  containerName: SONARR_SERVICE_NAME,
  hostname: `${SONARR_SERVICE_NAME}.${DOMAIN}`,
  labels: {
    'traefik.enable': 'true',
    [`traefik.http.routers.${SONARR_SERVICE_NAME}.rule`]:
      `Host(\`${SONARR_SERVICE_NAME}.${DOMAIN}\`)`,
    [`traefik.http.services.${SONARR_SERVICE_NAME}.loadbalancer.server.port`]:
      SONARR_INTERNAL_PORT,
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
    [SONARR_INTERNAL_PORT]: SONARR_EXTERNAL_PORT,
  },
  volumes: getServiceAppVolume(SONARR_SERVICE_NAME, {
    withDownloads: true,
    withTvShows: true,
  }),
  restartPolicy: RESTART_POLICY.UNLESS_STOPPED,
};
