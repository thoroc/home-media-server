import {
  Compose,
  defaultBazarrService,
  defaultLidarrService,
  defaultRadarrService,
  defaultSonarrService,
  Service,
  ServiceOptions,
} from '@scope/services';
import { Checkbox } from 'jsr:@cliffy/prompt@1.0.0-rc.7.ts';
import { getBazarrService } from './services/bazarr.ts';
import { getLidarrService } from './services/lidarr.ts';
import { getRadarrService } from './services/radarr.ts';
import { getSonarrService } from './services/sonarr.ts';

interface InitActionOptions {
  interactive?: boolean;
}

export const initAction = async (options: InitActionOptions) => {
  console.log('Initializing project...', options);

  // const services = ['bazarr', 'lidarr', 'radarr', 'sonarr', 'tautulli'];

  const services = [
    { name: 'bazarr', compose: defaultBazarrService },
    { name: 'lidarr', compose: defaultLidarrService },
    { name: 'radarr', compose: defaultRadarrService },
    { name: 'sonarr', compose: defaultSonarrService },
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
      let compose: Compose = {};

      if (serviceName === 'bazarr') {
        compose = await getBazarrService(defaultBazarrService);
      }

      if (serviceName === 'lidarr') {
        compose = await getLidarrService(defaultLidarrService);
      }

      if (serviceName === 'radarr') {
        compose = await getRadarrService(defaultRadarrService);
      }

      if (serviceName === 'sonarr') {
        compose = await getSonarrService(defaultSonarrService);
      }

      if (serviceName === 'tautulli') {
        console.log('Initializing Tautulli...');
      }

      const service = new Service(serviceName)
        .setImage(compose.image || 'default-image')
        .setContainerName(compose.containerName || 'default-container-name')
        .setHostname(compose.hostname)
        .setLabels(compose.labels || {})
        .setNetworks(compose.networks || [])
        .setEnvFile(compose.envFile || 'default-env-file')
        .setEnvironmentVariables(compose.environmentVariables || {})
        .setPorts(compose.ports || [])
        .setVolumes(compose.volumes || [])
        .setRestartPolicy(compose.restartPolicy || 'always');

      service.save();
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
