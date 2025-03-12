import {
  Compose,
  defaultBazarrService,
  defaultLidarrService,
  defaultPlexService,
  defaultProwlarrService,
  defaultQbittorrentService,
  defaultRadarrService,
  defaultSonarrService,
  defaultTautulliService,
  defaultWatchtowerService,
  Service,
} from '@scope/services';
import { Checkbox } from 'jsr:@cliffy/prompt@1.0.0-rc.7/checkbox';
import { exists } from 'jsr:@std/fs';
import { ServiceConfig } from './constants.ts';
import { getService } from './prompts/get-service.ts';

interface initInteractiveActionOptions {
  services: ServiceConfig[];
  overwrite?: boolean;
}

export const initInteractiveAction = async (
  options: initInteractiveActionOptions,
) => {
  const overwrite = options.overwrite || false;

  console.log('Interactive mode enabled!');
  const answers = await Checkbox.prompt({
    message: 'Select service to initialize:',
    options: await Promise.all(
      options.services.map(async (service) => {
        const configExists = await exists(
          `${Deno.cwd()}/services/${service.name}/docker-compose.yaml`,
        );
        return {
          name: `${service.name}${!configExists ? ' (exists)' : ''}`,
          value: service.name,
          checked: !configExists,
        };
      }),
    ),
  });

  console.log('Selected services:', answers);

  for (const serviceName of answers) {
    let service: Compose = {};

    if (serviceName === 'bazarr') {
      service = await getService(defaultBazarrService);
    }

    if (serviceName === 'lidarr') {
      service = await getService(defaultLidarrService);
    }

    if (serviceName === 'plexms') {
      service = await getService(defaultPlexService);
    }

    if (serviceName === 'prowlarr') {
      service = await getService(defaultProwlarrService);
    }

    if (serviceName === 'qbittorrent') {
      service = await getService(defaultQbittorrentService);
    }

    if (serviceName === 'radarr') {
      service = await getService(defaultRadarrService);
    }

    if (serviceName === 'sonarr') {
      service = await getService(defaultSonarrService);
    }

    if (serviceName === 'tautulli') {
      service = await getService(defaultTautulliService);
    }

    if (serviceName === 'watchtower') {
      service = await getService(defaultWatchtowerService);
    }

    new Service(serviceName, {
      compose: { serviceName, ...service },
    }).save({ overwrite });
  }
};
