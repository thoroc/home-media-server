import { Input } from 'jsr:@cliffy/prompt@1.0.0-rc.7';

export const ServiceNamePrompt = async (defaultImage: string) => {
  return await Input.prompt({
    message: 'Enter service name:',
    default: defaultImage,
  });
};
