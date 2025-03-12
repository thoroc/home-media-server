import { Service, ServiceConfig, ServiceOptions } from '@scope/services';

interface InitServiceOptions {
  services: ServiceConfig[];
  overwrite?: boolean;
}

export const initServiceAction = (options: InitServiceOptions) => {
  console.log('Initializing service...', options);

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
