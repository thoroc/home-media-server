export const getServiceImage = (serviceName: string): string => {
  return `lscr.io/linuxserver/${serviceName}:latest`;
};

export const getServiceAppVolume = (serviceName: string): string => {
  return `\${HMS_DIR}/apps/${serviceName}:/config`;
};
