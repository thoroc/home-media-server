import { Input } from 'jsr:@cliffy/prompt@1.0.0-rc.7';

export const EnvFilePrompt = async (defaultEnvFile: string) => {
  const envFile = await new Input({
    message: 'Enter the path to the .env file:',
    default: defaultEnvFile,
  }).prompt();

  return envFile;
};
