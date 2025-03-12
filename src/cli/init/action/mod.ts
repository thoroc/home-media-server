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

  try {
    if (interactive) {
      await initInteractiveAction({ services: SERVICES, overwrite: overwrite });
    } else if (services) {
      initServiceAction({
        services: SERVICES.filter((service) => services.includes(service.name)),
        overwrite: overwrite,
      });
    } else {
      console.log('Interactive mode disabled!');
      for (const service of SERVICES) {
        const serviceOptions: ServiceOptions = {
          compose: service.compose,
        };

        new Service(service.name, serviceOptions).save({ overwrite });
      }
    }
  } catch (error) {
    console.error(error);
  }

  console.log('Project initialized!');
};
