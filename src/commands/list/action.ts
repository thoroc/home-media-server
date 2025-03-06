import { colors } from 'jsr:@cliffy/ansi@^1.0.0-rc.7/colors';
import { log } from '../helpers/logger.ts';
import {
  getIncludedServices,
  getRunningServices,
  getServices,
} from '../helpers/mod.ts';
import { GlobalOptions } from '../helpers/types.ts';

interface ListOptions extends GlobalOptions {
  all?: boolean;
  recursive?: boolean;
}

export const listAction = async (options: ListOptions) => {
  const recursive = options.recursive || false;
  const runningServices = await getRunningServices();

  if (options.verbose) {
    log.trace(
      `running services:  [${colors.cyan(runningServices.join(', '))}]`,
    );
  }

  for (const service of runningServices) {
    const serviceName = service.name;
    const serviceState = service.state;

    const exposedPorts = service.ports
      .filter(
        (port) =>
          port.mapped?.address === '0.0.0.0' &&
          port.exposed?.protocol === 'tcp',
      )
      .map((port) => port.exposed.port);

    const localAddresses = exposedPorts.map(
      (port) => `http://localhost:${port}`,
    );

    const message = `> ${colors.yellow(serviceName)} - ${
      colors.green(
        serviceState,
      )
    }${exposedPorts ? ` - ${localAddresses.join(', ')}` : ''}`;

    console.log(message);
  }

  if (options.all) {
    const runningServiceNames = runningServices.map((service) => service.name);

    if (options.verbose) {
      log.trace(
        `running service names: [${
          colors.cyan(runningServiceNames.join(','))
        }]`,
      );
    }

    let availableServices = getServices(options);

    if (recursive) {
      availableServices = {
        ...availableServices,
        ...getIncludedServices(options),
      };
    }

    if (options.verbose) {
      log.trace(
        'available services:',
        colors.cyan(availableServices?.toString() || 'none'),
      );
    }

    if (availableServices) {
      const missingServices = Object.keys(availableServices).filter(
        (service) => !runningServiceNames.includes(service),
      );

      if (missingServices.length > 0) {
        console.log('available services:');
        // console.table(missingServices);
        for (const service of missingServices) {
          console.log(
            `> ${colors.yellow(service)} - run this service with ${
              colors.cyan(
                `./hms.ts start -a ${service}`,
              )
            }`,
          );
        }
        return;
      }
    } else {
      console.log(colors.bgBrightYellow(
        'no services available. Have you tried running with the "--recursive" flag?',
      ));
    }
  }
};
