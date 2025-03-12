import { Service, ServiceOptions, SERVICES } from '@scope/services';
import { initInteractiveAction } from './interactive.ts';
import { initServiceAction } from './service.ts';

interface InitActionOptions {
  interactive?: boolean;
  services?: string[];
  overwrite?: boolean;
}

export const initAction = async (options: InitActionOptions) => {
  console.log('Initializing project...', options);
  const interactive = options.interactive || false;
  const services = options.services || [];
  const overwrite = options.overwrite || false;
  const availableServices = SERVICES.map((service) => service.name);

  try {
    if (interactive) {
      await initInteractiveAction({ services: SERVICES, overwrite: overwrite });
    } else if (
      services.length > 0 &&
      services.every((service) => availableServices.includes(service))
    ) {
      const initServices = SERVICES.filter((service) =>
        services.includes(service.name)
      );

      await initServiceAction({ services: initServices, overwrite: overwrite });
    } else {
      console.log('Interactive mode disabled!');
      for (const service of SERVICES) {
        const serviceName = service.name;
        const compose = service.compose;

        const serviceOptions: ServiceOptions = {
          compose,
        };

        new Service(serviceName, serviceOptions).save({ overwrite });
      }
    }
  } catch (error) {
    console.error(error);
  }

  console.log('Project initialized!');
};
