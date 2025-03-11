import { ListOrDict } from '@json-types/compose';
import { ENVIRONMENT_VARIABLES, RESTART_POLICY } from './constants.ts';

export type EnvironmentVariableType =
  typeof ENVIRONMENT_VARIABLES[keyof typeof ENVIRONMENT_VARIABLES];

export type RestartPolicyType =
  typeof RESTART_POLICY[keyof typeof RESTART_POLICY];

export type Compose = {
  image?: string;
  containerName?: string;
  hostname?: string;
  labels?: ListOrDict;
  networks?: string[];
  command?: string;
  envFile?: string;
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
