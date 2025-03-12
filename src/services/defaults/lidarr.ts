import {
  DEFAULT_ENVIRONMENT_VARIABLES,
  DOMAIN,
  ENV_FILE_PATH,
  NETWORK_NAME,
  volumes,
} from '../constants.ts';
import { restartPolicy, ServiceType } from '../types.ts';
import { getServiceImage, getTraefikLabels } from './helpers.ts';

export const LIDARR_SERVICE_NAME = 'lidarr';
export const LIDARR_INTERNAL_PORT = 8686;
export const LIDARR_EXTERNAL_PORT = 8686;

export const defaultLidarrService: ServiceType = {
  serviceName: LIDARR_SERVICE_NAME,
  image: getServiceImage(LIDARR_SERVICE_NAME),
  containerName: LIDARR_SERVICE_NAME,
  hostname: `${LIDARR_SERVICE_NAME}.${DOMAIN}`,
  labels: getTraefikLabels(LIDARR_SERVICE_NAME, LIDARR_INTERNAL_PORT),
  networks: [NETWORK_NAME],
  envFile: [ENV_FILE_PATH],
  environmentVariables: DEFAULT_ENVIRONMENT_VARIABLES,
  ports: {
    [LIDARR_INTERNAL_PORT]: LIDARR_EXTERNAL_PORT,
  },
  volumes: {
    [volumes.localAppdir(LIDARR_SERVICE_NAME)]: '/config',
    [volumes.LOCAL_DATA_DOWNLOADS]: '/downloads',
    [volumes.LOCAL_DATA_MEDIA_MUSIC]: '/media/music',
  },
  restartPolicy: restartPolicy.UNLESS_STOPPED,
};
