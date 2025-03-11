import { Service, ServiceOptions } from '@scope/services';
import { ServiceConfig } from './constants.ts';

interface InitActionOptions {
  services: ServiceConfig[];
  overwrite?: boolean;
}

export const initAppAction = (options: InitActionOptions) => {
  console.log('Initializing app...', options);

  const overwrite = options.overwrite || false;

  for (const service of options.services) {
    const serviceName = service.name;
    const compose = service.compose;

    const serviceOptions: ServiceOptions = {
      compose,
    };

    console.log('Initializing service:', serviceName, compose);

    new Service(serviceName, serviceOptions).save({ overwrite });
  }
};
