import { List } from 'jsr:@cliffy/prompt@1.0.0-rc.7';

export const getPortsPrompt = async (defaultPorts: string[]) => {
  const pattern = /^\d+:\d+$/;
  const validate = (value: string) => pattern.test(value);

  if (defaultPorts.some((port) => !validate(port))) {
    throw new Error(
      'Invalid port pattern. Please use the format: host:container',
    );
  }

  return await List.prompt({
    message: 'Enter ports:',
    default: defaultPorts,
  });
};
