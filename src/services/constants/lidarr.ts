export const LIDARR_NAME = 'lidarr';
export const LIDARR_IMAGE = 'lscr.io/linuxserver/lidarr:latest';
export const LIDARR_PORTS = ['8686:8686'];
export const LIDARR_VOLUMES = [
  '${HMS_DIR}/apps/lidarr:/config',
  '${HMS_DIR}/data/media:/mnt/media',
];
