import {
  type Compose,
  DefinitionsService,
  ListOrDict,
} from '@json-types/compose';
import * as yaml from 'jsr:@std/yaml';

interface ServiceOptions {
  rootDir?: string;
  fileName?: string;
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
      this._dockerCompose.services[this.serviceName].labels = labels;
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

  public setEnvFile(envFile: string): Service {
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
        environmentVariables;
    }

    return this;
  }

  public setPorts(ports: string[]): Service {
    if (
      this._dockerCompose.services &&
      this._dockerCompose.services[this.serviceName]
    ) {
      this._dockerCompose.services[this.serviceName].ports = ports;
    }

    return this;
  }

  public setVolumes(volumes: string[]): Service {
    if (
      this._dockerCompose.services &&
      this._dockerCompose.services[this.serviceName]
    ) {
      this._dockerCompose.services[this.serviceName].volumes = volumes;
    }

    return this;
  }

  public setRestartPolicy(restart: string): Service {
    if (
      this._dockerCompose.services &&
      this._dockerCompose.services[this.serviceName]
    ) {
      this._dockerCompose.services[this.serviceName].restart = restart;
    }

    return this;
  }

  save() {
    Deno.mkdirSync(`${this.rootDir}/${this.serviceName}`, { recursive: true });
    Deno.writeTextFileSync(
      `${this.rootDir}/${this.serviceName}/${this.fileName}`,
      yaml.stringify(this._dockerCompose),
    );
  }
}
