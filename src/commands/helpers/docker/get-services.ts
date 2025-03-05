import { PropertiesServices } from '@json-types/compose';
import { colors } from 'jsr:@cliffy/ansi@^1.0.0-rc.7/colors';
import { log } from '../logger.ts';
import { GlobalOptions } from '../types.ts';
import { getCompose } from './get-compose.ts';

interface GetServicesOptions extends GlobalOptions {
  filePath?: string;
}

/**
 * Retrieves the services defined in a Docker Compose file.
 *
 * @param {string} [filePath] - The optional path to the Docker Compose file. If not provided, a default path will be used.
 * @returns {string[]} An array of service names defined in the Docker Compose file.
 *
 * @remarks
 * This function reads the Docker Compose file specified by `filePath`, extracts the services section,
 * and returns the names of the services as an array of strings. If no services are found, an error message
 * is logged to the console.
 */
export const getServices = (
  options?: GetServicesOptions,
): PropertiesServices | undefined => {
  const compose = getCompose(options);
  const services = compose.services as PropertiesServices;

  if (options?.verbose) {
    log.trace(`compose: ${colors.cyan(JSON.stringify(compose, null, 2))}`);
    log.trace('services:', colors.cyan(services?.toString() || 'none'));
  }

  if (!services) {
    console.warn(
      colors.bgBrightRed(
        `No services found in ${options?.filePath || 'docker-compose.yml'}`,
      ),
    );
  }

  return services;
};
