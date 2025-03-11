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

export const BAZARR_SERVICE_NAME = 'bazarr';
export const BAZARR_INTERNAL_PORT = 6767;
export const BAZARR_EXTERNAL_PORT = 6767;

export const defaultBazarrService: ServiceType = {
  serviceName: BAZARR_SERVICE_NAME,
  image: getServiceImage(BAZARR_SERVICE_NAME),
  containerName: BAZARR_SERVICE_NAME,
  hostname: `${BAZARR_SERVICE_NAME}.${DOMAIN}`,
  labels: getTraefikLabels(BAZARR_SERVICE_NAME, BAZARR_INTERNAL_PORT),
  networks: [NETWORK_NAME],
  envFile: [ENV_FILE_PATH],
  environmentVariables: DEFAULT_ENVIRONMENT_VARIABLES,
  ports: {
    [BAZARR_INTERNAL_PORT]: BAZARR_EXTERNAL_PORT,
  },
  volumes: getServiceAppVolume(BAZARR_SERVICE_NAME, {
    withMedia: true,
  }),
  restartPolicy: restartPolicy.UNLESS_STOPPED,
};
