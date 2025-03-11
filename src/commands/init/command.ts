import { Command } from 'jsr:@cliffy/command@1.0.0-rc.7';
import { initAction } from './action/mod.ts';

export const initCommand = new Command()
  .description('Initialize a new project')
  .option('-a, --app <app...:string>', 'The app to initialize')
  .option('-f, --force', 'Force initialization')
  .option('-I, --interactive', 'Interactive mode', { conflicts: ['app'] })
  .action(initAction);
