import {
  Compose,
  defaultBazarrService,
  defaultLidarrService,
  defaultProwlarrService,
  defaultQbittorrentService,
  defaultRadarrService,
  defaultSonarrService,
  defaultTautulliService,
  defaultWatchtowerService,
  Service,
  ServiceOptions,
} from '@scope/services';
import { Checkbox } from 'jsr:@cliffy/prompt@1.0.0-rc.7.ts';
import { getServiceDefaultValues } from './services/get-service-default-values.ts';

interface InitActionOptions {
  interactive?: boolean;
}

export const initAction = async (options: InitActionOptions) => {
  console.log('Initializing project...', options);

  const services = [
    { name: 'bazarr', compose: defaultBazarrService },
    { name: 'lidarr', compose: defaultLidarrService },
    { name: 'radarr', compose: defaultRadarrService },
    { name: 'sonarr', compose: defaultSonarrService },
    { name: 'prowlarr', compose: defaultProwlarrService },
    { name: 'tautulli', compose: defaultTautulliService },
    { name: 'qbittorrent', compose: defaultQbittorrentService },
    { name: 'watchtower', compose: defaultWatchtowerService },
  ];

  if (options.interactive) {
    console.log('Interactive mode enabled!');
    const answers = await Checkbox.prompt(
      {
        message: 'Select service to initialize:',
        options: services.map((service) => ({
          name: service.name,
          value: service.name,
          checked: false,
        })),
      },
    );

    console.log('Selected services:', answers);

    for (const serviceName of answers) {
      let service: Compose = {};

      if (serviceName === 'bazarr') {
        service = await getServiceDefaultValues(defaultBazarrService);
      }

      if (serviceName === 'lidarr') {
        service = await getServiceDefaultValues(defaultLidarrService);
      }

      if (serviceName === 'prowlarr') {
        service = await getServiceDefaultValues(defaultProwlarrService);
      }

      if (serviceName === 'qbittorrent') {
        service = await getServiceDefaultValues(defaultQbittorrentService);
      }

      if (serviceName === 'radarr') {
        service = await getServiceDefaultValues(defaultRadarrService);
      }

      if (serviceName === 'sonarr') {
        service = await getServiceDefaultValues(defaultSonarrService);
      }

      if (serviceName === 'tautulli') {
        service = await getServiceDefaultValues(defaultTautulliService);
      }

      if (serviceName === 'watchtower') {
        service = await getServiceDefaultValues(defaultWatchtowerService);
      }

      new Service(serviceName, {
        compose: { serviceName, ...service },
      }).save();
    }
  } else {
    console.log('Interactive mode disabled!');
    for (const service of services) {
      const serviceName = service.name;
      const compose = service.compose;

      const serviceOptions: ServiceOptions = {
        compose: {
          serviceName: serviceName,
          image: compose.image!,
          containerName: compose.containerName!,
          hostname: compose.hostname,
          labels: compose.labels!,
          networks: compose.networks!,
          envFile: compose.envFile!,
          environmentVariables: compose.environmentVariables!,
          ports: compose.ports!,
          volumes: compose.volumes!,
          restartPolicy: compose.restartPolicy!,
        },
      };

      new Service(serviceName, serviceOptions).save();
    }
  }

  console.log('Project initialized!');
};
