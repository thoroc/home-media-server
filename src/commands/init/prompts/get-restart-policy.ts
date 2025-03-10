import { RestartPolicyType } from '@scope/services';
import { Select } from 'jsr:@cliffy/prompt@1.0.0-rc.7.js';

export const getRestartPolicyPrompt = async (
  defaultRestartPolicy: RestartPolicyType,
) => {
  return await Select.prompt({
    message: 'Restart policy:',
    default: defaultRestartPolicy,
    options: ['no', 'always', 'unless-stopped', 'on-failure'],
  });
};
