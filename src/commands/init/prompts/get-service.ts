import { RestartPolicyType, ServiceType } from '@scope/services';
import { getEnvFilePrompt } from '../prompts/get-env-file.ts';
import {
  getCommandPrompt,
  getContainerNamePrompt,
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

export const getService = async (service: ServiceType) => {
  const answers: Record<string, string | string[]> = {};

  for (const prop of Object.keys(service)) {
    switch (prop) {
      case 'serviceName':
        answers[prop] = await getServiceNamePrompt(service.serviceName);
        break;
      case 'image':
        answers[prop] = await getImagePrompt(service.image!);
        break;
      case 'containerName':
        answers[prop] = await getContainerNamePrompt(service.containerName!);
        break;
      case 'hostname':
        answers[prop] = await getHostnamePrompt(service.hostname!);
        break;
      case 'labels':
        answers[prop] = await getLabelsPrompt(service.labels!);
        break;
      case 'networks':
        answers[prop] = await getNetworksPrompt(service.networks!);
        break;
      case 'command':
        answers[prop] = await getCommandPrompt(service.command!);
        break;
      case 'envFile':
        answers[prop] = await getEnvFilePrompt(service.envFile!);
        break;
      case 'environmentVariables':
        answers[prop] = await getEnvironmentVariablesPrompt(
          service.environmentVariables!,
        );
        break;
      case 'ports':
        answers[prop] = await getPortsPrompt(service.ports!);
        break;
      case 'volumes':
        answers[prop] = await getVolumesPrompt(service.volumes!);
        break;
      case 'restartPolicy':
        answers[prop] = await getRestartPolicyPrompt(
          service.restartPolicy!,
        ) as RestartPolicyType;
        break;
      default:
        break;
    }
  }

  return answers;
};
