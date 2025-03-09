export const BAZARR_IMAGE = 'lscr.io/linuxserver/bazarr:latest';
export const BAZARR_PORTS = ['6767:6767'];
export const BAZARR_NAME = 'bazarr';
export const BAZARR_VOLUMES = [
  '${HMS_DIR}/apps/bazarr:/config',
  '${HMS_DIR}/data/media:/mnt/media',
];
