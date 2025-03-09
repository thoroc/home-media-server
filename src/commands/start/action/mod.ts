import { checkRunningServices } from '@scope/core';
import 'jsr:@std/dotenv/load';
import { startAll } from './all.ts';
import { startApp } from './app.ts';
import { startInteractive } from './interactive.ts';

interface StartOptions {
  all?: boolean;
  app?: string[];
  interactive?: boolean;
  restart?: boolean;
}

export const startAction = async (options: StartOptions) => {
  console.log('Starting application...', Deno.cwd());
  const interactive = options.interactive || false;
  const all = options.all || !options.app;
  const app = options.app || [];
  const restart = options.restart || false;

  try {
    if (interactive) {
      await startInteractive({ restart });
    } else if (all) {
      await startAll({ restart });
    } else if (app) {
      await startApp(app, { restart });
    }

    await checkRunningServices();
  } catch (error) {
    console.error(error);
  }
};
