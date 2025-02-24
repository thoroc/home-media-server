import { colors } from 'jsr:@cliffy/ansi@^1.0.0-rc.7/colors';
import * as dc from 'npm:docker-compose';
import { getRunningServices } from './get-running-services.ts';

export const checkRunningServices = async () => {
  const runningServices: dc.DockerComposePsResultService[] =
    await getRunningServices();

  for (const service of runningServices) {
    const servicesName = service.name;
    const state = service.state;
    const ports = new Set(
      service.ports
        .map((port) => (port.mapped ? port.mapped.port : []))
        .filter(Number),
    );

    for (const port of ports) {
      console.log(
        `> ${colors.yellow(servicesName)} (${
          colors.cyan(
            state,
          )
        }) - http://localhost:${port}`,
      );
    }
  }
};
