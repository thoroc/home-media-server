import {
  LIDARR_IMAGE,
  LIDARR_NAME,
  LIDARR_PORTS,
  LIDARR_VOLUMES,
  Service,
} from '@scope/services';
import {
  DEFAULT_ENVIRONMENT_VARIABLES,
  NETWORK_NAME,
  RESTART_POLICY,
} from '../../../services/mod.ts';
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

export const lidarrService = async () => {
  console.log('Initializing Lidarr...');

  const serviceName = await getServiceNamePrompt(LIDARR_NAME);
  const image = await getImagePrompt(LIDARR_IMAGE);
  const containerName = await getContainerNamePrompt(LIDARR_NAME);
  const hostname = await getHostnamePrompt(`${LIDARR_NAME}.lan`);
  const labels = await getLabelsPrompt([
    'traefik.enable=true',
    `traefik.http.routers.${LIDARR_NAME}.rule=Host(\`${LIDARR_NAME}.lan\`)`,
    `traefik.http.services.${LIDARR_NAME}.loadbalancer.server.port=8686`,
  ]);
  const network = await getNetworksPrompt([NETWORK_NAME]);
  const envFile = await getEnvFilePrompt('../../.env');
  const environmentVaiables = await getEnvironmentVariablesPrompt(
    [...DEFAULT_ENVIRONMENT_VARIABLES],
  );
  const ports = await getPortsPrompt(LIDARR_PORTS);
  const volumes = await getVolumesPrompt(LIDARR_VOLUMES);
  const restartPolicy = await getRestartPolicyPrompt(
    RESTART_POLICY.UNLESS_STOPPED,
  );

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
