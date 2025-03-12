import {
  DOCKER_COMPOSE_FILE,
  getIncludedServices,
  getRunningServices,
} from '@scope/core';
import { Checkbox } from 'jsr:@cliffy/prompt@1.0.0-rc.7';
import { GlobalOptions } from '../types.ts';

interface AppCheckboxOptions extends GlobalOptions {
  running?: boolean;
}

export const AppCheckbox = async (
  actionName: string,
  options?: AppCheckboxOptions,
): Promise<string[]> => {
  const services = options?.running
    ? (await getRunningServices()).map((service) => service.name)
    : Object.keys(getIncludedServices({ dcFile: DOCKER_COMPOSE_FILE }) || {});

  const available = services.map((service) => ({
    name: service,
    value: service,
  }));

  if (services.length === 0) {
    console.log('No running container to stop');
    Deno.exit(1);
  }

  return await Checkbox.prompt({
    message: `Pick the apps to ${actionName}`,
    options: available,
  });
};
