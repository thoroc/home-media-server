import 'jsr:@std/dotenv/load';
import * as dc from 'npm:docker-compose';
import { AppCheckbox } from '../../helpers/mod.ts';
import { GlobalOptions } from '../../helpers/types.ts';
import { setupDir } from './setup.ts';

interface StartInteractiveOptions extends GlobalOptions {
  restart?: boolean;
}

export const startInteractive = async (options?: StartInteractiveOptions) => {
  const config = { log: true };
  let response: dc.IDockerComposeResult;
  console.log('Starting interactive mode...');

  const apps = await AppCheckbox('start');

  await setupDir(apps, { verbose: options?.verbose });

  if (options?.restart) {
    console.log('Restarting multiple applications...', apps);

    response = await dc.restartMany(apps, config);
  } else {
    console.log('Starting multiple applications...', apps);

    response = await dc.upMany(apps, config);
  }

  console.log(response.out);
};
