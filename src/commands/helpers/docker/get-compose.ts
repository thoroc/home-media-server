import { type Compose } from '@json-types/compose';
import { parse } from 'jsr:@std/yaml';
import { DOCKER_COMPOSE_FILE } from '../constants.ts';

/**
 * Retrieves and parses a Docker Compose configuration file.
 *
 * @param {string} [filePath] - Optional path to the Docker Compose file. If not provided, defaults to `DOCKER_COMPOSE_FILE`.
 * @returns {Compose} The parsed Docker Compose configuration.
 * @throws Will throw an error if the file cannot be read or parsed.
 */
export const getCompose = (filePath?: string): Compose => {
  try {
    const dockerComposeFile = filePath || DOCKER_COMPOSE_FILE;
    // console.debug(
    //   'Get docker compose config from',
    //   colors.yellow(dockerComposeFile)
    // );
    const data = Deno.readTextFileSync(dockerComposeFile);
    return parse(data) as Compose;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
