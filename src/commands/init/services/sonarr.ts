import { RestartPolicyType, ServiceType } from '@scope/services';
import {
  getEnvFilePrompt,
  getEnvironmentVariablesPrompt,
  getImagePrompt,
  getLabelsPrompt,
  getNetworksPrompt,
  getPortsPrompt,
  getRestartPolicyPrompt,
  getServiceNamePrompt,
  getVolumesPrompt,
} from '../prompts/mod.ts';

export const getSonarrService = async (
  service: ServiceType,
): Promise<ServiceType> => {
  console.log('Initializing Sonarr...');

  const serviceName = await getServiceNamePrompt(service.serviceName);
  const image = await getImagePrompt(service.image!);
  const containerName = await getServiceNamePrompt(service.containerName!);
  const hostname = await getServiceNamePrompt(service.hostname!);
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
