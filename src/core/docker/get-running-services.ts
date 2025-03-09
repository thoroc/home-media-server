import * as dc from 'npm:docker-compose';

/**
 * Retrieves the list of running Docker services.
 *
 * This function uses the `docker-compose ps` command to get the status of all services
 * and filters out the ones that are currently running (i.e., their state starts with 'Up').
 *
 * @returns {Promise<dc.DockerComposePsResultService[]>} A promise that resolves to an array of running Docker services.
 * @throws Will throw an error if the `docker-compose ps` command fails.
 */
export const getRunningServices = async (): Promise<
  dc.DockerComposePsResultService[]
> => {
  try {
    const runningServices: dc.DockerComposePsResultService[] = [];
    const containers = await dc.ps();

    for (const service of containers.data.services) {
      if (service.state.startsWith('Up')) {
        runningServices.push(service);
      }
    }

    return runningServices;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
