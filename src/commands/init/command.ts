import { Command } from 'jsr:@cliffy/command@1.0.0-rc.7';
import { ServiceType } from '../helpers/mod.ts';
import { initAction } from './action/mod.ts';

export const initCommand = new Command()
  .description('Initialize a new project')
  .type('service', new ServiceType())
  .option('-s, --service <service...:services>', 'The app to initialize')
  .option('-O, --overwrite', 'Overwrite existing files')
  .option('-I, --interactive', 'Interactive mode', { conflicts: ['service'] })
  .action(initAction);
