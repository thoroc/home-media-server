import { ListOrDict } from '@json-types/compose';
import { Separator, transformObjectToArray } from '@scope/services';
import { List } from 'jsr:@cliffy/prompt@1.0.0-rc.7';

export const PortsPrompt = async (defaultPorts: ListOrDict) => {
  const pattern = /^\d+:\d+$/;
  const validate = (value: string) => pattern.test(value);

  if (Array.isArray(defaultPorts)) {
    if (defaultPorts.some((port) => !validate(port))) {
      throw new Error(
        'Invalid port pattern. Please use the format: host:container',
      );
    }

    return await List.prompt({
      message: 'Enter ports:',
      default: defaultPorts,
    });
  }

  return await List.prompt({
    message: 'Enter ports:',
    default: transformObjectToArray(defaultPorts, Separator.COLUMN),
  });
};
