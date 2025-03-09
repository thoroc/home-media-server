import { assertEquals } from '@std/assert/equals';
import { describe, it } from 'jsr:@std/testing/bdd';
import { returnsNext, stub } from 'jsr:@std/testing/mock';
import { getCompose } from './get-compose.ts';
import { getServices } from './get-services.ts';

describe('getServices', () => {
  it('should return the services defined in a Docker Compose file', () => {
    // Arrange
    using _getCompose = stub(
      { getCompose },
      'getCompose',
      returnsNext([{ services: { service1: {}, service2: {} } }]),
    );

    // Act
    const actual = getServices();

    // Assert
    assertEquals(actual, { service1: {}, service2: {} });
  });
});
