import {
  DOMAIN,
  ENVIRONMENT_VARIABLES,
  NETWORK_NAME,
  RESTART_POLICY,
} from '../constants.ts';
import { getServiceAppVolume, getServiceImage } from '../helpers.ts';
import { ServiceType } from '../types.ts';

export const TAUTULLI_SERVICE_NAME = 'tautulli';
export const TAUTULLI_INTERNAL_PORT = 8181;
export const TAUTULLI_EXTERNAL_PORT = 8181;

export const defaultTautulliService: ServiceType = {
  serviceName: TAUTULLI_SERVICE_NAME,
  image: getServiceImage(TAUTULLI_SERVICE_NAME),
  containerName: TAUTULLI_SERVICE_NAME,
  hostname: `${TAUTULLI_SERVICE_NAME}.${DOMAIN}`,
  labels: {
    'traefik.enable': 'true',
    [`traefik.http.routers.${TAUTULLI_SERVICE_NAME}.rule`]:
      `Host(\`${TAUTULLI_SERVICE_NAME}.${DOMAIN}\`)`,
    [`traefik.http.services.${TAUTULLI_SERVICE_NAME}.loadbalancer.server.port`]:
      TAUTULLI_INTERNAL_PORT,
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
    [TAUTULLI_INTERNAL_PORT]: TAUTULLI_EXTERNAL_PORT,
  },
  volumes: {
    ['${HMS_DIR}/apps/plexms/config/Library/Application Support/Plex Media Server/Logs']:
      `/logs:ro`,
    ...getServiceAppVolume(TAUTULLI_SERVICE_NAME),
  },
  restartPolicy: RESTART_POLICY.UNLESS_STOPPED,
};
