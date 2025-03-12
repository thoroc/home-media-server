import { ListOrDict } from '@json-types/compose';
import { transformObjectToArray } from '@scope/services';
import { List } from 'jsr:@cliffy/prompt@1.0.0-rc.7';

export const EnvironmentVariablesPrompt = async (
  defaultEnvironment: ListOrDict,
) => {
  const pattern = /^[^=]+=[^=]+$/;
  const validate = (value: string) => pattern.test(value);

  if (Array.isArray(defaultEnvironment)) {
    if (defaultEnvironment.some((env) => !validate(env))) {
      throw new Error(
        'Invalid environment variable pattern. Please use the format: key=value',
      );
    }

    return await List.prompt({
      message: 'Enter environment variables:',
      default: defaultEnvironment,
    });
  }

  return await List.prompt({
    message: 'Enter environment variables:',
    default: transformObjectToArray(defaultEnvironment, '='),
  });
};
