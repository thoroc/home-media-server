import { ListOrDict } from '@json-types/compose';
import { transformObjectToArray } from '@scope/services';
import { List } from 'jsr:@cliffy/prompt@1.0.0-rc.7';

export const LabelsPrompt = async (defaultLabels: ListOrDict) => {
  const pattern = /^.+=.+$/;
  const validate = (value: string) => pattern.test(value);

  if (Array.isArray(defaultLabels)) {
    if (defaultLabels.some((label) => !validate(label))) {
      throw new Error(
        'Invalid label pattern. Please use the format: key=value',
      );
    }

    return await List.prompt({
      message: 'Enter labels:',
      default: defaultLabels,
    });
  }

  return await List.prompt({
    message: 'Enter labels:',
    default: transformObjectToArray(defaultLabels),
  });
};
