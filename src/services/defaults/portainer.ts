import {
  DEFAULT_ENVIRONMENT_VARIABLES,
  DOMAIN,
  ENV_FILE_PATH,
  NETWORK_NAME,
  volumes,
} from '../constants.ts';
import { restartPolicy, ServiceType } from '../types.ts';
import { getTraefikLabels } from './helpers.ts';

export const PORTAINER_SERVICE_NAME = 'portainer';
export const PORTAINER_INTERNAL_PORT = 9000;
export const PORTAINER_EXTERNAL_PORT = 9000;

export const defaultPortainerService: ServiceType = {
  serviceName: PORTAINER_SERVICE_NAME,
  image: 'portainer/portainer-ce:latest',
  containerName: PORTAINER_SERVICE_NAME,
  hostname: `${PORTAINER_SERVICE_NAME}.${DOMAIN}`,
  labels: getTraefikLabels(PORTAINER_SERVICE_NAME, PORTAINER_INTERNAL_PORT),
  networks: [NETWORK_NAME],
  envFile: [ENV_FILE_PATH],
  environmentVariables: DEFAULT_ENVIRONMENT_VARIABLES,
  ports: {
    [PORTAINER_INTERNAL_PORT]: PORTAINER_EXTERNAL_PORT,
  },
  volumes: {
    [volumes.DOCKER_SOCKET]: volumes.DOCKER_SOCKET,
    [`${volumes.localAppdir(PORTAINER_SERVICE_NAME)}/data`]: '/data',
  },
  restartPolicy: restartPolicy.UNLESS_STOPPED,
};
