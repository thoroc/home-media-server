import { colors } from 'jsr:@cliffy/ansi@^1.0.0-rc.7/colors';
import {
  getIncludedServices,
  getRunningServices,
  getServices,
} from '../helpers/mod.ts';

interface ListOptions {
  all?: boolean;
  recursive?: boolean;
}

export const listAction = async (options: ListOptions) => {
  const recursive = options.recursive || false;
  const runningServices = await getRunningServices();

  for (const service of runningServices) {
    const serviceName = service.name;
    const serviceState = service.state;

    const exposedPorts = service.ports
      .filter(
        (port) =>
          port.mapped?.address === '0.0.0.0' && port.exposed?.protocol === 'tcp'
      )
      .map((port) => port.exposed.port);

    const localAddresses = exposedPorts.map(
      (port) => `http://localhost:${port}`
    );

    const message = `> ${colors.yellow(serviceName)} - ${colors.green(
      serviceState
    )}${exposedPorts ? ` - ${localAddresses.join(', ')}` : ''}`;

    console.log(message);
  }

  if (options.all) {
    const runningServiceNames = runningServices.map((service) => service.name);
    const availableServices = recursive ? getIncludedServices() : getServices();

    if (availableServices) {
      const missingServices = Object.keys(availableServices).filter(
        (service) => !runningServiceNames.includes(service)
      );

      if (missingServices.length > 0) {
        console.log('available services:');
        // console.table(missingServices);
        for (const service of missingServices) {
          console.log(
            `> ${colors.yellow(service)} - run this service with ${colors.cyan(
              `deno task cli start -a ${service}`
            )}`
          );
        }
        return;
      }
    }
  }
};
