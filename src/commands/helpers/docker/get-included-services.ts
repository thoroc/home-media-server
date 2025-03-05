import { DefinitionsInclude, PropertiesServices } from '@json-types/compose';
import { log } from '../logger.ts';
import { GlobalOptions } from '../types.ts';
import { getCompose } from './get-compose.ts';
import { getServices } from './get-services.ts';

interface GetIncludedServicesOptions extends GlobalOptions {
  filePath?: string;
}

/**
 * Retrieves the included services from a Docker Compose file.
 *
 * This function reads a Docker Compose file, extracts the `include` section,
 * and processes each included file to gather the services defined within them.
 *
 * @param {string} [filePath] - The optional path to the Docker Compose file. If not provided, a default path will be used.
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
      .reduce((acc, filePath) => {
        return {
          ...acc,
          ...getServices({ ...options, filePath }),
        };
      }, {});
  }

  return services;
};
