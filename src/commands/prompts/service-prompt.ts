import { RestartPolicyType, ServiceType } from '@scope/services';
import { CommandPrompt } from './command-prompt.ts';
import { ContainerNamePrompt } from './container-name-prompt.ts';
import { EnvFilePrompt } from './env-file-prompt.ts';
import { EnvironmentVariablesPrompt } from './environment-variables-prompt.ts';
import { HostnamePrompt } from './hostname-prompt.ts';
import { ImagePrompt } from './image-prompt.ts';
import { LabelsPrompt } from './labels-prompt.ts';
import { NetworksPrompt } from './networks-prompt.ts';
import { PortsPrompt } from './ports-prompt.ts';
import { RestartPolicyPrompt } from './restart-policy-prompt.ts';
import { ServiceNamePrompt } from './service-name-prompt.ts';
import { VolumesPrompt } from './volumes-prompt.ts';

export const ServicePrompt = async (service: ServiceType) => {
  const answers: Record<string, string | string[]> = {};

  for (const prop of Object.keys(service)) {
    switch (prop) {
      case 'serviceName':
        answers[prop] = await ServiceNamePrompt(service.serviceName);
        break;
      case 'image':
        answers[prop] = await ImagePrompt(service.image!);
        break;
      case 'containerName':
        answers[prop] = await ContainerNamePrompt(service.containerName!);
        break;
      case 'hostname':
        answers[prop] = await HostnamePrompt(service.hostname!);
        break;
      case 'labels':
        answers[prop] = await LabelsPrompt(service.labels!);
        break;
      case 'networks':
        answers[prop] = await NetworksPrompt(service.networks!);
        break;
      case 'command':
        answers[prop] = await CommandPrompt(service.command!);
        break;
      case 'envFile':
        answers[prop] = await EnvFilePrompt(service.envFile as string);
        break;
      case 'environmentVariables':
        answers[prop] = await EnvironmentVariablesPrompt(
          service.environmentVariables!,
        );
        break;
      case 'ports':
        answers[prop] = await PortsPrompt(service.ports!);
        break;
      case 'volumes':
        answers[prop] = await VolumesPrompt(service.volumes!);
        break;
      case 'restartPolicy':
        answers[prop] = await RestartPolicyPrompt(
          service.restartPolicy!,
        ) as RestartPolicyType;
        break;
      default:
        break;
    }
  }

  return answers;
};
