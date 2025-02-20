import { assertEquals } from '@std/assert/equals';
import { describe, it } from 'jsr:@std/testing/bdd';
import { returnsNext, stub } from 'jsr:@std/testing/mock';
import * as stdYaml from 'jsr:@std/yaml';
import { getCompose } from './compose.ts';

describe('geCompose', () => {
  it('should return the parsed Docker Compose configuration', () => {
    // Arrange
    using _denoReadTextFileSync = stub(
      Deno,
      'readTextFileSync',
      returnsNext(['version: "3.8"']),
    );

    using _parse = stub(
      { parse: stdYaml.parse },
      'parse',
      returnsNext([{ version: '3.8' }]),
    );

    // Act
    const actual = getCompose();

    // Assert
    assertEquals(actual, { version: '3.8' });
  });
});
