import { DOMAIN, NETWORK_NAME, RESTART_POLICY } from '../constants.ts';
import { ServiceType } from '../types.ts';

export const WATCHTOWER_SERVICE_NAME = 'watchtower';

export const defaultWatchtowerService: ServiceType = {
  serviceName: WATCHTOWER_SERVICE_NAME,
  image: 'containrrr/watchtower',
  containerName: WATCHTOWER_SERVICE_NAME,
  hostname: `${WATCHTOWER_SERVICE_NAME}.${DOMAIN}`,
  labels: {
    'traefik.enable': 'true',
    [`traefik.http.routers.${WATCHTOWER_SERVICE_NAME}.rule`]:
      `Host(\`${WATCHTOWER_SERVICE_NAME}.${DOMAIN}\`)`,
  },
  networks: [NETWORK_NAME],
  command: '--cleanup --interval 86400',
  volumes: {
    '/var/run/docker.sock': '/var/run/docker.sock',
  },
  restartPolicy: RESTART_POLICY.UNLESS_STOPPED,
};
