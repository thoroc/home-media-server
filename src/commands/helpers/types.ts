export type ContainerState =
  | 'Running'
  | 'Exited'
  | 'Created'
  | 'Dead'
  | 'Paused'
  | 'Restarting'
  | 'Removing'
  | 'Up'
  | 'Down'
  | 'Exit'
  | 'Starting'
  | 'Stopping'
  | 'Killed'
  | 'Crashed'
  | 'Healthy'
  | 'Unhealthy'
  | 'None'
  | 'Unknown';

export interface GlobalOptions {
  verbose?: boolean;
}
