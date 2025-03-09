import { ArgumentValue, Type, ValidationError } from '@cliffy/command';
import { getIncludedServices } from '@scope/core';

export class AppType extends Type<string> {
  public readonly apps: string[];

  constructor() {
    super();
    this.apps = Object.keys(
      getIncludedServices() || {},
    );
  }

  public parse({ label, name, value }: ArgumentValue): string {
    if (!this.apps.includes(value)) {
      throw new ValidationError(
        `${label} "${name}" must be a valid app, but got "${value}". Possible values are: ${
          this.apps.join(
            ', ',
          )
        }`,
      );
    }

    return value;
  }

  override complete(): Array<string> {
    return this.apps;
  }
}
