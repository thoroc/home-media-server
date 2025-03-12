import { Service, ServiceOptions } from '@scope/services';
import { initAppAction } from './app.ts';
import { SERVICES } from './constants.ts';
import { initInteractiveAction } from './interactive.ts';

interface InitActionOptions {
  interactive?: boolean;
  app?: string[];
  overwrite?: boolean;
}

export const initAction = async (options: InitActionOptions) => {
  console.log('Initializing project...', options);
  const interactive = options.interactive || false;
  const app = options.app || [];
  const overwrite = options.overwrite || false;
  const availableServices = SERVICES.map((service) => service.name);

  try {
    if (interactive) {
      await initInteractiveAction({ services: SERVICES, overwrite: overwrite });
    } else if (
      app.length > 0 &&
      app.every((service) => availableServices.includes(service))
    ) {
      const initServices = SERVICES.filter((service) =>
        app.includes(service.name)
      );

      await initAppAction({ services: initServices, overwrite: overwrite });
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
