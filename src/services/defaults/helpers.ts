import { DOMAIN } from '../constants.ts';

export const getServiceImage = (serviceName: string): string => {
  return `lscr.io/linuxserver/${serviceName}:latest`;
};

export interface GetServiceAppVolumeOptions {
  withDownloads?: boolean;
  withMedia?: boolean;
  withMovies?: boolean;
  withTvShows?: boolean;
}

export const getServiceAppVolume = (
  serviceName: string,
  options?: GetServiceAppVolumeOptions,
): Record<string, string> => {
  const volumes = { [`\${HMS_DIR}/apps/${serviceName}`]: '/config' };

  if (options?.withDownloads) {
    volumes['${HMS_DIR}/data/downloads'] = '/downloads';
  }

  if (options?.withMedia) {
    volumes['${HMS_DIR}/data/media'] = '/mnt/media';
  }

  if (options?.withMovies) {
    volumes['${HMS_DIR}/data/media/movies'] = '/mnt/media';
  }

  if (options?.withTvShows) {
    volumes['${HMS_DIR}/data/media/tvshows'] = '/mnt/media';
  }

  return volumes;
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
