import { List } from 'jsr:@cliffy/prompt@1.0.0-rc.7';

export const getPortsPrompt = async (defaultPorts: string[]) => {
  return await List.prompt({
    message: 'Enter ports:',
    default: defaultPorts,
  });
};
