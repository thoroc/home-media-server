import { getIncludedServices } from '@scope/core';
import 'jsr:@std/dotenv/load';
import * as dc from 'npm:docker-compose';
import { setupDir } from './setup.ts';

interface StartAllOptions {
  restart?: boolean;
}

export const startAll = async (options?: StartAllOptions) => {
  const config = { log: true };
  let response: dc.IDockerComposeResult;

  if (options?.restart) {
    console.log('Restarting all applications...');

    response = await dc.restartAll(config);
  } else {
    console.log('Starting all applications...');

    const allServices = getIncludedServices();
    if (allServices) await setupDir(Object.keys(allServices));

    response = await dc.upAll(config);
  }

  console.log(response.out);
};
