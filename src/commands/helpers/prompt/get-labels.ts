import { List } from 'jsr:@cliffy/prompt@1.0.0-rc.7';

export const getLabelsPrompt = async (defaultLabels: string[]) => {
  return await List.prompt({
    message: 'Enter labels:',
    default: defaultLabels,
  });
};
