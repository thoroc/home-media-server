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

export const PROWLARR_SERVICE_NAME = 'prowlarr';
export const PROWLARR_INTERNAL_PORT = 9696;
export const PROWLARR_EXTERNAL_PORT = 9696;

export const defaultProwlarrService: ServiceType = {
  serviceName: PROWLARR_SERVICE_NAME,
  image: getServiceImage(PROWLARR_SERVICE_NAME),
  containerName: PROWLARR_SERVICE_NAME,
  hostname: `${PROWLARR_SERVICE_NAME}.${DOMAIN}`,
  labels: getTraefikLabels(PROWLARR_SERVICE_NAME, PROWLARR_INTERNAL_PORT),
  networks: [NETWORK_NAME],
  envFile: [ENV_FILE_PATH],
  environmentVariables: DEFAULT_ENVIRONMENT_VARIABLES,
  ports: {
    [PROWLARR_INTERNAL_PORT]: PROWLARR_EXTERNAL_PORT,
  },
  volumes: getServiceAppVolume(PROWLARR_SERVICE_NAME, {
    withDownloads: true,
    withMovies: true,
  }),
  restartPolicy: restartPolicy.UNLESS_STOPPED,
};
