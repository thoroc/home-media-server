import { Input } from 'jsr:@cliffy/prompt@1.0.0-rc.7';

export const HostnamePrompt = async (defaultHostname: string) => {
  return await Input.prompt({
    message: 'Enter hostname:',
    default: defaultHostname,
  });
};
