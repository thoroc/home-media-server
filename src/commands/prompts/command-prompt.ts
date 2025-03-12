import { Input } from 'jsr:@cliffy/prompt@1.0.0-rc.7/input';

export const CommandPrompt = async (defaultCommand: string | string[]) => {
  return await Input.prompt({
    message: 'Enter command:',
    default: Array.isArray(defaultCommand)
      ? defaultCommand.join(' ')
      : defaultCommand,
  });
};
