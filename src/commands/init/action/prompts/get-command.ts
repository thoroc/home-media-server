import { Input } from 'jsr:@cliffy/prompt@1.0.0-rc.7/input';

export const getCommandPrompt = async (defaultCommand: string) => {
  return await Input.prompt({
    message: 'Enter command:',
    default: defaultCommand,
  });
};
