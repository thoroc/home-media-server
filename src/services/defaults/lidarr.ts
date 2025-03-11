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
  volumes: getServiceAppVolume(LIDARR_SERVICE_NAME, {
    withMedia: true,
  }),
  restartPolicy: restartPolicy.UNLESS_STOPPED,
};
