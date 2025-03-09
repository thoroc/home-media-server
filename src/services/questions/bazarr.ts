import { Input, prompt } from 'jsr:@cliffy/prompt@1.0.0-rc.7';

export const bazaarPrompt = await prompt([
  {
    type: Input,
    name: 'bazarrImage',
    message: 'Enter Bazarr image:',
    default: 'linuxserver/bazarr:latest',
  },
  {
    type: Input,
    name: 'bazarrPorts',
    message: 'Enter Bazarr ports:',
    default: '6767:6767',
  },
  {
    type: Input,
    name: 'bazarrName',
    message: 'Enter Bazarr name:',
    default: 'bazarr',
  },
  {
    type: Input,
    name: 'bazarrContainerName',
    message: 'Enter Bazarr container name:',
    default: 'bazarr',
  },
]);
