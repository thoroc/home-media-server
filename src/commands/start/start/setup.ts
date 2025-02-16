import 'jsr:@std/dotenv/load';
import chalk from 'npm:chalk';
import { getCompose, mkdir } from '../../helpers/mod.ts';

export const setupDir = async (apps: string[]) => {
  for (const app of apps) {
    const compose = getCompose(`services/${app}/docker-compose.yml`);

    if (!compose) {
      console.error(chalk.redBright(`Compose file not found for app "${app}"`));
      Deno.exit(1);
    }

    const volumes =
      (compose.services &&
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

        await mkdir(cleanPath, { allowed_dir: ALLOWED_VOLUME_PATHS });
      }
    }
  }
};
