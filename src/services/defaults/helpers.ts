import { DOMAIN } from '../constants.ts';

export const getServiceImage = (serviceName: string): string => {
  return `lscr.io/linuxserver/${serviceName}:latest`;
};

export interface GetServiceAppVolumeOptions {
  withDownloads?: boolean | { internal: string; external: string };
  withMedia?: boolean | { internal: string; external: string };
  withMovies?: boolean | { internal: string; external: string };
  withTvShows?: boolean | { internal: string; external: string };
  withMusic?: boolean | { internal: string; external: string };
}

export const getServiceAppVolume = (
  serviceName: string,
  options?: GetServiceAppVolumeOptions,
): Record<string, string> => {
  const volumes = { [`\${HMS_DIR}/apps/${serviceName}`]: '/config' };

  if (typeof options?.withDownloads === 'object') {
    volumes[options.withDownloads.external ?? '${HMS_DIR}/data/downloads'] =
      options.withDownloads.internal ?? '/downloads';
  } else if (options?.withDownloads) {
    volumes['${HMS_DIR}/data/downloads'] = '/downloads';
  }

  if (typeof options?.withMedia === 'object') {
    volumes[options.withMedia.external ?? '${HMS_DIR}/data/media'] =
      options.withMedia.internal ?? '/mnt/media';
  } else if (options?.withMedia) {
    volumes['${HMS_DIR}/data/media'] = '/mnt/media';
  }

  if (typeof options?.withMovies === 'object') {
    volumes[options.withMovies.external ?? '${HMS_DIR}/data/media/movies'] =
      options.withMovies.internal ?? '/mnt/media';
  } else if (options?.withMovies) {
    volumes['${HMS_DIR}/data/media/movies'] = '/mnt/media';
  }

  if (typeof options?.withTvShows === 'object') {
    volumes[options.withTvShows.external ?? '${HMS_DIR}/data/media/tvshows'] =
      options.withTvShows.internal ?? '/mnt/media';
  } else if (options?.withTvShows) {
    volumes['${HMS_DIR}/data/media/tvshows'] = '/mnt/media';
  }

  if (typeof options?.withMusic === 'object') {
    volumes[options.withMusic.external ?? '${HMS_DIR}/data/media/music'] =
      options.withMusic.internal ?? '/mnt/media';
  } else if (options?.withMusic) {
    volumes['${HMS_DIR}/data/media/music'] = '/mnt/media';
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
