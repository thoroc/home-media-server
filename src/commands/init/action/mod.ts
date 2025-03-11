import { Service, ServiceOptions } from '@scope/services';
import { initInteractiveAction } from './interactive.ts';
import { SERVICES } from './constants.ts';
import { initAppAction } from './app.ts';

interface InitActionOptions {
  interactive?: boolean;
  app?: string[];
  force?: boolean;
}

export const initAction = async (options: InitActionOptions) => {
  console.log('Initializing project...', options);
  const interactive = options.interactive || false;
  const app = options.app || [];
  const force = options.force || false;
  const availableServices = SERVICES.map((service) => service.name);

  try {
    if (interactive) {
      await initInteractiveAction({ services: SERVICES, overwrite: force });
    } else if (
      app.length > 0 &&
      app.every((service) => availableServices.includes(service))
    ) {
      const initServices = SERVICES.filter((service) =>
        app.includes(service.name)
      );

      await initAppAction({ services: initServices, overwrite: force });
    } else {
      console.log('Interactive mode disabled!');
      for (const service of SERVICES) {
        const serviceName = service.name;
        const compose = service.compose;

        const serviceOptions: ServiceOptions = {
          compose,
        };

        new Service(serviceName, serviceOptions).save({ overwrite: force });
      }
    }
  } catch (error) {
    console.error(error);
  }

  console.log('Project initialized!');
};
