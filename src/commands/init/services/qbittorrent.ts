import { RestartPolicyType, ServiceType } from '@scope/services';
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
} from '../prompts/mod.ts';

export const getQbittorrentService = async (service: ServiceType): Promise<
  ServiceType
> => {
  console.log('Initializing qBittorrent...');

  const serviceName = await getServiceNamePrompt(service.serviceName);
  const image = await getImagePrompt(service.image!);
  const containerName = await getContainerNamePrompt(service.containerName!);
  const hostname = await getHostnamePrompt(service.hostname!);
  const labels = await getLabelsPrompt(service.labels!);
  const networks = await getNetworksPrompt(service.networks!);
  const envFile = await getEnvFilePrompt(service.envFile!);
  const environmentVariables = await getEnvironmentVariablesPrompt(
    service.environmentVariables!,
  );
  const ports = await getPortsPrompt(service.ports!);
  const volumes = await getVolumesPrompt(service.volumes!);
  const restartPolicy = await getRestartPolicyPrompt(
    service.restartPolicy!,
  ) as RestartPolicyType;

  return {
    serviceName,
    image,
    containerName,
    hostname,
    labels,
    networks,
    envFile,
    environmentVariables,
    ports,
    volumes,
    restartPolicy,
  };
};
