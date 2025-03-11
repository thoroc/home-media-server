import {
  Command,
  type Compose,
  DefinitionsService,
  EnvFile,
  ListOrDict,
} from '@json-types/compose';
import { colors } from 'jsr:@cliffy/ansi@1.0.0-rc.7/colors';
import * as yaml from 'jsr:@std/yaml';
import { transformObjectToArray } from './transformer.ts';
import { RestartPolicyType, Separator, ServiceType } from './types.ts';

export interface ServiceOptions {
  rootDir?: string;
  fileName?: string;
  compose?: ServiceType;
}

export class Service {
  readonly serviceName: string;
  readonly rootDir: string;
  readonly fileName: string;
  private _dockerCompose: Compose;

  constructor(
    serviceName: string,
    options?: ServiceOptions,
  ) {
    this.serviceName = serviceName;
    this._dockerCompose = {
      services: {
        [serviceName]: {} as unknown as DefinitionsService,
      },
    };
    if (options?.compose?.image) this.setImage(options.compose.image);
    if (options?.compose?.containerName) {
      this.setContainerName(options.compose.containerName);
    }
    if (options?.compose?.hostname) {
      this.setHostname(options.compose.hostname);
    }
    if (options?.compose?.labels) this.setLabels(options.compose.labels);
    if (options?.compose?.networks) {
      this.setNetworks(options.compose.networks);
    }
    if (options?.compose?.envFile) this.setEnvFile(options.compose.envFile);
    if (options?.compose?.environmentVariables) {
      this.setEnvironmentVariables(options.compose.environmentVariables);
    }
    if (options?.compose?.command) this.setCommand(options.compose.command);
    if (options?.compose?.ports) this.setPorts(options.compose.ports);
    if (options?.compose?.volumes) this.setVolumes(options.compose.volumes);
    if (options?.compose?.restartPolicy) {
      this.setRestartPolicy(options.compose.restartPolicy);
    }

    this.rootDir = options?.rootDir || `${Deno.cwd()}/services`;
    this.fileName = options?.fileName || `docker-compose.yml`;
  }

  public get dockerCompose(): Compose {
    return this._dockerCompose || {};
  }

  public setImage(image: string): Service {
    if (
      this._dockerCompose.services &&
      this._dockerCompose.services[this.serviceName]
    ) {
      this._dockerCompose.services[this.serviceName].image = image;
    }

    return this;
  }

  public setContainerName(containerName: string): Service {
    if (
      this._dockerCompose.services &&
      this._dockerCompose.services[this.serviceName]
    ) {
      this._dockerCompose.services[this.serviceName].container_name =
        containerName;
    }

    return this;
  }

  public setHostname(hostname?: string): Service {
    if (
      this._dockerCompose.services &&
      this._dockerCompose.services[this.serviceName]
    ) {
      this._dockerCompose.services[this.serviceName].hostname = hostname ??
        `${this.serviceName}.lan`;
    }

    return this;
  }

  public setLabels(labels: ListOrDict): Service {
    if (
      this._dockerCompose.services &&
      this._dockerCompose.services[this.serviceName]
    ) {
      this._dockerCompose.services[this.serviceName].labels =
        Array.isArray(labels)
          ? labels
          : transformObjectToArray(labels, Separator.EQUAL);
    }

    return this;
  }

  public setNetworks(networks: string[]): Service {
    if (
      this._dockerCompose.services &&
      this._dockerCompose.services[this.serviceName]
    ) {
      this._dockerCompose.services[this.serviceName].networks = networks;
    }

    return this;
  }

  public setEnvFile(envFile: EnvFile): Service {
    if (
      this._dockerCompose.services &&
      this._dockerCompose.services[this.serviceName]
    ) {
      this._dockerCompose.services[this.serviceName].env_file = envFile;
    }

    return this;
  }

  public setEnvironmentVariables(environmentVariables: ListOrDict): Service {
    if (
      this._dockerCompose.services &&
      this._dockerCompose.services[this.serviceName]
    ) {
      this._dockerCompose.services[this.serviceName].environment =
        Array.isArray(environmentVariables)
          ? environmentVariables
          : transformObjectToArray(environmentVariables, Separator.EQUAL);
    }

    return this;
  }

  public setCommand(command: Command): Service {
    if (
      this._dockerCompose.services &&
      this._dockerCompose.services[this.serviceName]
    ) {
      this._dockerCompose.services[this.serviceName].command = command;
    }

    return this;
  }

  public setPorts(ports: ListOrDict): Service {
    if (
      this._dockerCompose.services &&
      this._dockerCompose.services[this.serviceName]
    ) {
      this._dockerCompose.services[this.serviceName].ports =
        Array.isArray(ports) ? ports : transformObjectToArray(ports);
    }

    return this;
  }

  public setVolumes(volumes: ListOrDict): Service {
    if (
      this._dockerCompose.services &&
      this._dockerCompose.services[this.serviceName]
    ) {
      this._dockerCompose.services[this.serviceName].volumes =
        Array.isArray(volumes) ? volumes : transformObjectToArray(volumes);
    }

    return this;
  }

  public setRestartPolicy(restart: RestartPolicyType): Service {
    if (
      this._dockerCompose.services &&
      this._dockerCompose.services[this.serviceName]
    ) {
      this._dockerCompose.services[this.serviceName].restart = restart;
    }

    return this;
  }

  save() {
    const outputFile = `${this.rootDir}/${this.serviceName}/${this.fileName}`;

    console.log(
      `Saving ${colors.green(this.serviceName)}'s docker-config.yaml to ${
        colors.yellow(outputFile)
      }`,
    );

    if (
      this._dockerCompose.services &&
      this._dockerCompose.services[this.serviceName]
    ) {
      console.log(
        'volumes:',
        this._dockerCompose.services[this.serviceName].volumes,
      );
      console.log(
        'volumes as yaml:\n',
        yaml.stringify(this._dockerCompose.services[this.serviceName].volumes),
      );
    }

    Deno.mkdirSync(`${this.rootDir}/${this.serviceName}`, { recursive: true });
    Deno.writeTextFileSync(
      `${this.rootDir}/${this.serviceName}/${this.fileName}`,
      yaml.stringify(this._dockerCompose, {
        lineWidth: -1, // Disables automatic line wrapping
        // forceQuotes: true, // Ensures all values are quoted
      }),
    );
  }
}
