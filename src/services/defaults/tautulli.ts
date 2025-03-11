import {
  DEFAULT_ENVIRONMENT_VARIABLES,
  DOMAIN,
  ENV_FILE_PATH,
  NETWORK_NAME,
} from '../constants.ts';
import { restartPolicy, ServiceType } from '../types.ts';
import {
  getServiceAppVolume,
  getServiceImage,
  getTraefikLabels,
} from './helpers.ts';

export const TAUTULLI_SERVICE_NAME = 'tautulli';
export const TAUTULLI_INTERNAL_PORT = 8181;
export const TAUTULLI_EXTERNAL_PORT = 8181;

export const defaultTautulliService: ServiceType = {
  serviceName: TAUTULLI_SERVICE_NAME,
  image: getServiceImage(TAUTULLI_SERVICE_NAME),
  containerName: TAUTULLI_SERVICE_NAME,
  hostname: `${TAUTULLI_SERVICE_NAME}.${DOMAIN}`,
  labels: getTraefikLabels(TAUTULLI_SERVICE_NAME, TAUTULLI_INTERNAL_PORT),
  networks: [NETWORK_NAME],
  envFile: [ENV_FILE_PATH],
  environmentVariables: DEFAULT_ENVIRONMENT_VARIABLES,
  ports: {
    [TAUTULLI_INTERNAL_PORT]: TAUTULLI_EXTERNAL_PORT,
  },
  volumes: {
    ['${HMS_DIR}/apps/plexms/config/Library/Application Support/Plex Media Server/Logs']:
      `/logs:ro`,
    ...getServiceAppVolume(TAUTULLI_SERVICE_NAME),
  },
  restartPolicy: restartPolicy.UNLESS_STOPPED,
};
