import { DefinitionsInclude, PropertiesServices } from '@json-types/compose';
import { GlobalOptions } from '../../commands/helpers/types.ts';
import { log } from '../logger.ts';
import { getCompose } from './get-compose.ts';
import { getServices } from './get-services.ts';

interface GetIncludedServicesOptions extends GlobalOptions {
  dcFile?: string;
}

/**
 * Retrieves the included services from a Docker Compose file.
 *
 * This function reads a Docker Compose file, extracts the `include` section,
 * and processes each included file to gather the services defined within them.
 *
 * @param {GetIncludedServicesOptions} [options] - The options object.
 * @param {string} [options.dcFile] - The optional path to the Docker Compose file. If not provided, a default path will be used.
 * @param {boolean} [options.verbose] - The optional flag to enable verbose logging.
 * @returns {string[]} An array of service names included in the Docker Compose file.
 */
export const getIncludedServices = (
  options?: GetIncludedServicesOptions,
): PropertiesServices | undefined => {
  const compose = getCompose(options);

  if (options?.verbose) {
    log.trace(`compose: ${compose}`);
  }

  const include = compose.include as DefinitionsInclude;
  let services: PropertiesServices = {};

  if (include) {
    services = include
      .toString()
      .split(',')
      .reduce((acc, dcFile) => {
        return {
          ...acc,
          ...getServices({ ...options, dcFile }),
        };
      }, {});
  }

  return services;
};
