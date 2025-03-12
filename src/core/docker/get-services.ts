import { PropertiesServices } from '@json-types/compose';
import { GlobalOptions } from '@scope/commands';
import { colors } from 'jsr:@cliffy/ansi@^1.0.0-rc.7/colors';
import { DOCKER_COMPOSE_FILE } from '../constants.ts';
import { log } from '../logger.ts';
import { getCompose } from './get-compose.ts';

interface GetServicesOptions extends GlobalOptions {
  dcFile?: string;
}

/**
 * Retrieves the services defined in a Docker Compose file.
 *
 * @param {GetServicesOptions} [options] - The options object.
 * @param {string} [options.filePath] - The optional path to the Docker Compose file. If not provided, a default path will be used.
 * @param {boolean} [options.verbose] - The optional flag to enable verbose logging.
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
      colors.bgBrightMagenta(
        `> No services found in ${options?.dcFile || DOCKER_COMPOSE_FILE}`,
      ),
    );
  }

  return services;
};
