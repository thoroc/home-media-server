import { List } from 'jsr:@cliffy/prompt@1.0.0-rc.7';

export const getVolumesPrompt = async (defaultVolumes: string[]) => {
  return await List.prompt({
    message: 'Enter volumes:',
    default: defaultVolumes,
  });
};
