#!/usr/bin/env -S deno run -A
import { Command } from 'jsr:@cliffy/command@1.0.0-rc.7';
import {
  envCommand,
  initCommand,
  listCommand,
  startCommand,
  stopCommand,
} from './src/cli/mod.ts';

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  await new Command()
    .name('hms-victor')
    .version('0.1.5')
    .description('CLI to manage Home Media Server (HMS) services.')
    .option('-v, --verbose', 'Enable verbose output.', { global: true })
    .command('list', listCommand)
    .command('start', startCommand)
    .command('stop', stopCommand)
    .command('env', envCommand)
    .command('init', initCommand)
    .parse(Deno.args);
}
