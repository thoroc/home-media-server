import { Checkbox, prompt } from 'jsr:@cliffy/prompt@1.0.0-rc.7';
import { bazarrService } from './services/bazarr.ts';

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
};
