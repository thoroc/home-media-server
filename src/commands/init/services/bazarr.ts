import { Service } from '@scope/services';
import {
  getContainerNamePrompt,
  getEnvFilePrompt,
  getEnvironmentVariablesPrompt,
  getHostnamePrompt,
  getImagePrompt,
  getLabelsPrompt,
  getNetworksPrompt,
  getPortsPrompt,
  getRestartPolicyPrompt,
  getServiceNamePrompt,
  getVolumesPrompt,
} from '../../helpers/prompt/mod.ts';

export const bazarrService = async () => {
  console.log('Initializing Bazarr...');

  const serviceName = await getServiceNamePrompt('bazarr');
  const image = await getImagePrompt('lscr.io/linuxserver/bazarr:latest');
  const containerName = await getContainerNamePrompt('bazarr');
  const hostname = await getHostnamePrompt('bazarr.lan');
  const labels = await getLabelsPrompt([
    'traefik.enable=true',
    'traefik.http.routers.bazarr.rule=Host(`bazarr.lan`)',
    'traefik.http.services.bazarr.loadbalancer.server.port=6767',
  ]);
  const network = await getNetworksPrompt(['high-seas']);
  const envFile = await getEnvFilePrompt('../../.env');
  const environmentVaiables = await getEnvironmentVariablesPrompt([
    'PUID=${PUID}',
    'PGID=${PUID}',
    'TZ=${TZ}',
  ]);
  const ports = await getPortsPrompt(['6767:6767']);
  const volumes = await getVolumesPrompt([
    '${HMS_DIR}/apps/bazarr:/config',
    '${HMS_DIR}/data/media:/mnt/media',
  ]);
  const restartPolicy = await getRestartPolicyPrompt('unless-stopped');

  const compose = new Service(serviceName)
    .setImage(image)
    .setContainerName(containerName)
    .setHostname(hostname)
    .setLabels(labels)
    .setNetworks(network)
    .setEnvFile(envFile)
    .setEnvironmentVariables(environmentVaiables)
    .setPorts(ports)
    .setVolumes(volumes)
    .setRestartPolicy(restartPolicy);

  compose.save();
};
