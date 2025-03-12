import { SERVICES } from '@scope/services';
import {
  ArgumentValue,
  Type,
  ValidationError,
} from 'jsr:@cliffy/command@1.0.0-rc.7';

export class ServiceType extends Type<string> {
  public readonly services: string[];

  constructor() {
    super();
    this.services = SERVICES.map((service) => service.name);
  }

  public parse({ label, name, value }: ArgumentValue): string {
    if (!this.services.includes(value)) {
      throw new ValidationError(
        `${label} "${name}" must be a valid service, but got "${value}". Possible values are: ${
          this.services.join(
            ', ',
          )
        }`,
      );
    }

    return value;
  }

  override complete(): Array<string> {
    return this.services;
  }
}
