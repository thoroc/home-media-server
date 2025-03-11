import {
  defaultBazarrService,
  defaultLidarrService,
  defaultProwlarrService,
  defaultQbittorrentService,
  defaultRadarrService,
  defaultSonarrService,
  defaultTautulliService,
  defaultWatchtowerService,
  ServiceType,
} from '@scope/services';

export interface ServiceConfig {
  name: string;
  compose: ServiceType;
}

export const SERVICES: ServiceConfig[] = [
  { name: 'bazarr', compose: defaultBazarrService },
  { name: 'lidarr', compose: defaultLidarrService },
  { name: 'radarr', compose: defaultRadarrService },
  { name: 'sonarr', compose: defaultSonarrService },
  { name: 'prowlarr', compose: defaultProwlarrService },
  { name: 'tautulli', compose: defaultTautulliService },
  { name: 'qbittorrent', compose: defaultQbittorrentService },
  { name: 'watchtower', compose: defaultWatchtowerService },
];
