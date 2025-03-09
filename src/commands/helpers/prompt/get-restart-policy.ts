import { Select } from 'jsr:@cliffy/prompt@1.0.0-rc.7.js';

export const getRestartPolicyPrompt = async (defaultRestart: string) => {
  return await Select.prompt({
    message: 'Restart policy:',
    default: defaultRestart,
    options: ['no', 'always', 'unless-stopped', 'on-failure'],
  });
};
