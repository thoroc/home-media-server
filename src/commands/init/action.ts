import {
  Compose,
  defaultBazarrService,
  defaultLidarrService,
  defaultProwlarrService,
  defaultQbittorrentService,
  defaultRadarrService,
  defaultSonarrService,
  defaultTautulliService,
  Service,
  ServiceOptions,
} from '@scope/services';
import { Checkbox } from 'jsr:@cliffy/prompt@1.0.0-rc.7.ts';
import {
  getBazarrService,
  getLidarrService,
  getProwlarrService,
  getRadarrService,
  getSonarrService,
  getTautulliService,
} from './services/mod.ts';
import { getQbittorrentService } from './services/qbittorrent.ts';

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
        service = await getBazarrService(defaultBazarrService);
      }

      if (serviceName === 'lidarr') {
        service = await getLidarrService(defaultLidarrService);
      }

      if (serviceName === 'prowlarr') {
        service = await getProwlarrService(defaultProwlarrService);
      }

      if (serviceName === 'qbittorrent') {
        service = await getQbittorrentService(defaultQbittorrentService);
      }

      if (serviceName === 'radarr') {
        service = await getRadarrService(defaultRadarrService);
      }

      if (serviceName === 'sonarr') {
        service = await getSonarrService(defaultSonarrService);
      }

      if (serviceName === 'tautulli') {
        service = await getTautulliService(defaultTautulliService);
      }

      new Service(serviceName)
        .setImage(service.image || 'default-image')
        .setContainerName(service.containerName || 'default-container-name')
        .setHostname(service.hostname)
        .setLabels(service.labels || {})
        .setNetworks(service.networks || [])
        .setEnvFile(service.envFile || 'default-env-file')
        .setEnvironmentVariables(service.environmentVariables || {})
        .setPorts(service.ports || [])
        .setVolumes(service.volumes || [])
        .setRestartPolicy(service.restartPolicy || 'always')
        .save();
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
