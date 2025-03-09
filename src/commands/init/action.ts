import { Checkbox, prompt } from 'jsr:@cliffy/prompt@1.0.0-rc.7';
import {
  getServiceQuestions,
  importQuestionJson,
} from '../helpers/cli/service.ts';

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
    console.log('Initializing Bazarr...');

    const questionsData = await importQuestionJson('bazarr');

    if (questionsData) {
      const promptResults = await getServiceQuestions(questionsData);
      console.log('Bazarr image:', promptResults);
    } else {
      console.error('Failed to load questions for Bazarr.');
    }
  }
};
