import { DOMAIN, NETWORK_NAME } from '../constants.ts';
import { restartPolicy, ServiceType } from '../types.ts';
import { getTraefikLabels } from './helpers.ts';

export const WATCHTOWER_SERVICE_NAME = 'watchtower';

export const defaultWatchtowerService: ServiceType = {
  serviceName: WATCHTOWER_SERVICE_NAME,
  image: 'containrrr/watchtower',
  containerName: WATCHTOWER_SERVICE_NAME,
  hostname: `${WATCHTOWER_SERVICE_NAME}.${DOMAIN}`,
  labels: getTraefikLabels(WATCHTOWER_SERVICE_NAME),
  networks: [NETWORK_NAME],
  command: '--cleanup --interval 86400',
  volumes: {
    '/var/run/docker.sock': '/var/run/docker.sock',
  },
  restartPolicy: restartPolicy.UNLESS_STOPPED,
};
