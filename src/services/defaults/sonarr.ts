import { DOMAIN, ENV_FILE_PATH, NETWORK_NAME, volumes } from '../constants.ts';
import { environmentVariables, restartPolicy, ServiceType } from '../types.ts';
import { getServiceImage, getTraefikLabels } from './helpers.ts';

export const SONARR_SERVICE_NAME = 'sonarr';
export const SONARR_INTERNAL_PORT = 8989;
export const SONARR_EXTERNAL_PORT = 8989;

export const defaultSonarrService: ServiceType = {
  serviceName: SONARR_SERVICE_NAME,
  image: getServiceImage(SONARR_SERVICE_NAME),
  containerName: SONARR_SERVICE_NAME,
  hostname: `${SONARR_SERVICE_NAME}.${DOMAIN}`,
  labels: getTraefikLabels(SONARR_SERVICE_NAME, SONARR_INTERNAL_PORT),
  networks: [NETWORK_NAME],
  envFile: [ENV_FILE_PATH],
  environmentVariables: environmentVariables,
  ports: {
    [SONARR_INTERNAL_PORT]: SONARR_EXTERNAL_PORT,
  },
  volumes: {
    [volumes.localAppdir(SONARR_SERVICE_NAME)]: '/config',
    [volumes.LOCAL_DATA_DOWNLOADS]: '/downloads',
    [volumes.LOCAL_DATA_MEDIA_TVSHOWS]: '/data',
  },
  restartPolicy: restartPolicy.UNLESS_STOPPED,
};
