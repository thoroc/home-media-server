import { DOCKER_COMPOSE_FILE, getCompose, mkdir } from '@scope/core';
import { colors } from 'jsr:@cliffy/ansi@^1.0.0-rc.7/colors';
import 'jsr:@std/dotenv/load';
import { GlobalOptions } from '../../helpers/types.ts';

interface SetupDirOptions extends GlobalOptions {
  dcFile?: string;
}

export const setupDir = async (apps: string[], options?: SetupDirOptions) => {
  for (const app of apps) {
    if (options?.verbose) {
      console.log(`Setting up directories for app "${colors.yellow(app)}"...`);
    }

    const compose = getCompose({
      dcFile: `services/${app}/${options?.dcFile ?? DOCKER_COMPOSE_FILE}`,
      ...options,
    });

    if (!compose) {
      console.error(
        colors.brightRed(`Compose file not found for app "${app}"`),
      );
      Deno.exit(1);
    }

    const volumes = (compose.services &&
      compose.services[app] &&
      compose.services[app].volumes) ||
      [];

    const ALLOWED_VOLUME_PATHS = [
      Deno.env.get('HOME') || '',
      Deno.env.get('HMS_DIR') || '',
      Deno.cwd(),
    ].filter(Boolean);

    const customPath = Deno.env.get('HMS_DIR') || '';

    for (const volume of volumes) {
      if (typeof volume === 'string') {
        const volumePath = volume.split(':')[0];

        const cleanPath = customPath.includes('${HMS_DIR}')
          ? volumePath.replace('${HMS_DIR}', Deno.env.get('HMS_DIR') || '')
          : volumePath;

        if (options?.verbose) {
          console.log(`Creating directory: ${colors.yellow(cleanPath)}`);
        }

        await mkdir(cleanPath, { allowed_dir: ALLOWED_VOLUME_PATHS });
      }
    }
  }
};
