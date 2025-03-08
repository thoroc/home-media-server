import { Command } from 'jsr:@cliffy/command@1.0.0-rc.7';
import { initAction } from './action.ts';

export const initCommand = new Command()
  .description('Initialize a new project')
  .action(initAction);
