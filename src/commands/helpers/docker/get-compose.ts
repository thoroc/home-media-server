import { type Compose } from '@json-types/compose';
import { colors } from 'jsr:@cliffy/ansi@^1.0.0-rc.7/colors';
import { parse } from 'jsr:@std/yaml';
import { DOCKER_COMPOSE_FILE } from '../constants.ts';
import { log } from '../logger.ts';
import { GlobalOptions } from '../types.ts';

interface GetComposeOptions extends GlobalOptions {
  filePath?: string;
}

/**
 * Retrieves and parses a Docker Compose configuration file.
 *
 * @param {string} [filePath] - Optional path to the Docker Compose file. If not provided, defaults to `DOCKER_COMPOSE_FILE`.
 * @returns {Compose} The parsed Docker Compose configuration.
 * @throws Will throw an error if the file cannot be read or parsed.
 */
export const getCompose = (options?: GetComposeOptions): Compose => {
  try {
    const dockerComposeFile = options?.filePath || DOCKER_COMPOSE_FILE;

    if (options?.verbose) {
      log.trace(
        'Get docker compose config from',
        colors.cyan(dockerComposeFile),
      );
    }
    const data = Deno.readTextFileSync(dockerComposeFile);

    return parse(data) as Compose;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
