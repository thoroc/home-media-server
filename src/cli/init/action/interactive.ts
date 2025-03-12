import { ServiceCheckbox, ServicePrompt } from '@scope/commands';
import { Compose, Service, ServiceConfig } from '@scope/services';

interface initInteractiveActionOptions {
  services: ServiceConfig[];
  overwrite?: boolean;
}

export const initInteractiveAction = async (
  options: initInteractiveActionOptions,
) => {
  const overwrite = options.overwrite || false;

  console.log('Interactive mode enabled!');
  const answers = await ServiceCheckbox(
    'Select service to initialise',
    options.services,
  );

  console.log('Selected services:', answers);
  const serviceNames = options.services.map((service) => service.name);

  for (const serviceName of answers) {
    let service: Compose = {};
    const defaultService: ServiceConfig | undefined = options.services.find((
      service,
    ) => service.name === serviceName);

    if (serviceNames.includes(serviceName) && defaultService?.compose) {
      service = await ServicePrompt(defaultService.compose);
    }

    new Service(serviceName, {
      compose: { serviceName, ...service },
    }).save({ overwrite });
  }
};
