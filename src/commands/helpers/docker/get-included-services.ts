import { DefinitionsInclude, PropertiesServices } from '@json-types/compose';
import { getCompose } from './get-compose.ts';
import { getServices } from './get-services.ts';

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
  filePath?: string,
): PropertiesServices | undefined => {
  const services = getServices(filePath);

  const compose = getCompose(filePath);

  const include = compose.include as DefinitionsInclude;

  if (include) {
    const includedServices = include
      .toString()
      .split(',')
      .reduce((acc, includeFilePath) => {
        return { ...acc, ...getServices(includeFilePath) };
      }, {});

    return { ...services, ...includedServices };
  }

  return services;
};
