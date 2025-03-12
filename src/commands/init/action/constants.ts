import {
  defaultBazarrService,
  defaultLidarrService,
  defaultPlexService,
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
  { name: 'plexms', compose: defaultPlexService },
  { name: 'prowlarr', compose: defaultProwlarrService },
  { name: 'qbittorrent', compose: defaultQbittorrentService },
  { name: 'radarr', compose: defaultRadarrService },
  { name: 'sonarr', compose: defaultSonarrService },
  { name: 'tautulli', compose: defaultTautulliService },
  { name: 'watchtower', compose: defaultWatchtowerService },
];
