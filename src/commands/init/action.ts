import { Checkbox, prompt } from 'jsr:@cliffy/prompt@1.0.0-rc.7';
import { bazarrService } from './services/bazarr.ts';
import { lidarrService } from './services/lidarr.ts';

export const initAction = async () => {
  console.log('Initializing project...');

  const options = ['bazarr', 'lidarr', 'radarr', 'sonarr', 'tautulli'];

  const answers = await prompt([
    {
      name: 'service',
      message: 'Select service to initialize:',
      type: Checkbox,
      options,
    },
  ]);

  console.log('Selected services:', answers.service);

  if (answers.service?.includes('bazarr')) {
    await bazarrService();
  }

  if (answers.service?.includes('lidarr')) {
    await lidarrService();
  }

  if (answers.service?.includes('radarr')) {
    console.log('Initializing Radarr...');
  }

  if (answers.service?.includes('sonarr')) {
    console.log('Initializing Sonarr...');
  }

  if (answers.service?.includes('tautulli')) {
    console.log('Initializing Tautulli...');
  }

  console.log('Project initialized!');
};
