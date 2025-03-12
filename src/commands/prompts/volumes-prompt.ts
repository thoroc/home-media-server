import { ListOrDict } from '@json-types/compose';
import { Separator, transformObjectToArray } from '@scope/services';
import { List } from 'jsr:@cliffy/prompt@1.0.0-rc.7';

export const VolumesPrompt = async (defaultVolumes: ListOrDict) => {
  const pattern = /^[^:]+:[^:]+$/;
  const validate = (value: string) => pattern.test(value);

  if (Array.isArray(defaultVolumes)) {
    if (defaultVolumes.some((volume) => !validate(volume))) {
      throw new Error(
        'Invalid volume pattern. Please use the format: source:destination',
      );
    }

    return await List.prompt({
      message: 'Enter volumes:',
      default: defaultVolumes,
    });
  }

  return await List.prompt({
    message: 'Enter volumes:',
    default: transformObjectToArray(defaultVolumes, Separator.COLUMN),
  });
};
