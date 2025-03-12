import { ServiceConfig } from '@scope/services';
import { Checkbox } from 'jsr:@cliffy/prompt@1.0.0-rc.7/checkbox';
import { exists } from 'jsr:@std/fs';

export const ServiceCheckbox = async (
  message: string,
  services: ServiceConfig[],
): Promise<string[]> => {
  const available = await Promise.all(services.map(async (service) => {
    const configExists = await exists(
      `${Deno.cwd()}/services/${service.name}/docker-compose.yaml`,
    );
    return {
      name: `${service.name}${!configExists ? ' (exists)' : ''}`,
      value: service.name,
      checked: !configExists,
    };
  }));

  return await Checkbox.prompt({
    message: message,
    options: available,
  });
};
