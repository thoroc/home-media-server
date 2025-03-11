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

export const RADARR_SERVICE_NAME = 'radarr';
export const RADARR_INTERNAL_PORT = 7878;
export const RADARR_EXTERNAL_PORT = 7878;

export const defaultRadarrService: ServiceType = {
  serviceName: RADARR_SERVICE_NAME,
  image: getServiceImage(RADARR_SERVICE_NAME),
  containerName: RADARR_SERVICE_NAME,
  hostname: `${RADARR_SERVICE_NAME}.${DOMAIN}`,
  labels: getTraefikLabels(RADARR_SERVICE_NAME, RADARR_INTERNAL_PORT),
  networks: [NETWORK_NAME],
  envFile: [ENV_FILE_PATH],
  environmentVariables: DEFAULT_ENVIRONMENT_VARIABLES,
  ports: {
    [RADARR_INTERNAL_PORT]: RADARR_EXTERNAL_PORT,
  },
  volumes: getServiceAppVolume(RADARR_SERVICE_NAME, {
    withDownloads: true,
    withMovies: true,
  }),
  restartPolicy: restartPolicy.UNLESS_STOPPED,
};
