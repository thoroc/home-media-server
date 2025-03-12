import { DOMAIN } from '../constants.ts';

export const getServiceImage = (serviceName: string): string => {
  return `lscr.io/linuxserver/${serviceName}:latest`;
};

export const getTraefikLabels = (
  serviceName: string,
  port?: number,
): Record<string, string | number> => {
  const labels: Record<string, string | number> = {
    'traefik.enable': 'true',
    [`traefik.http.routers.${serviceName}.rule`]:
      `Host(\`${serviceName}.${DOMAIN}\`)`,
  };

  if (port) {
    labels[`traefik.http.services.${serviceName}.loadbalancer.server.port`] =
      port;
  }

  return labels;
};
