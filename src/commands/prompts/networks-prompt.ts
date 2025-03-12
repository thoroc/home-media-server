import { List } from 'jsr:@cliffy/prompt@1.0.0-rc.7';

export const NetworksPrompt = async (defaultNetworks: string[]) => {
  return await List.prompt({
    message: 'Select networks:',
    default: defaultNetworks,
  });
};
