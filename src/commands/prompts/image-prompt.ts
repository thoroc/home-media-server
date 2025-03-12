import { Input } from 'jsr:@cliffy/prompt@1.0.0-rc.7';

export const ImagePrompt = async (defaultImage: string) => {
  return await Input.prompt({
    message: 'Enter image:',
    default: defaultImage,
  });
};
