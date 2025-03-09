import { List } from 'jsr:@cliffy/prompt@1.0.0-rc.7';

export const getVolumesPrompt = async (defaultVolumes: string[]) => {
  const pattern = /^[^:]+:[^:]+$/;
  const validate = (value: string) => pattern.test(value);

  if (defaultVolumes.some((volume) => !validate(volume))) {
    throw new Error(
      'Invalid volume pattern. Please use the format: source:destination',
    );
  }

  return await List.prompt({
    message: 'Enter volumes:',
    default: defaultVolumes,
  });
};
