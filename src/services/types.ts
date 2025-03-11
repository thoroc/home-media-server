import { Command, EnvFile, ListOrDict } from '@json-types/compose';

export const environmentVariables = {
  PUID: 'PUID',
  PGID: 'PGID',
  TIMEZONE: 'TZ',
} as const;

export type EnvironmentVariableType =
  typeof environmentVariables[keyof typeof environmentVariables];

export const restartPolicy = {
  ALWAYS: 'always',
  NO: 'no',
  UNLESS_STOPPED: 'unless-stopped',
  ON_FAILURE: 'on-failure',
} as const;

export type RestartPolicyType =
  typeof restartPolicy[keyof typeof restartPolicy];

export type Compose = {
  image?: string;
  containerName?: string;
  hostname?: string;
  labels?: ListOrDict;
  networks?: string[];
  command?: Command;
  envFile?: EnvFile;
  environmentVariables?: ListOrDict;
  ports?: ListOrDict;
  volumes?: ListOrDict;
  restartPolicy?: RestartPolicyType;
};

export type ServiceType = Compose & { serviceName: string };

export const Separator = {
  EQUAL: '=',
  COLUMN: ':',
} as const;

export type SeparatorType = typeof Separator[keyof typeof Separator];
