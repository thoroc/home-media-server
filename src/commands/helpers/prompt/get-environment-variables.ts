import { List } from 'jsr:@cliffy/prompt@1.0.0-rc.7';

export const getEnvironmentVariablesPrompt = async (
  defaultEnvironment: string[],
) => {
  return await List.prompt({
    message: 'Enter environment variables:',
    default: defaultEnvironment,
  });
};
