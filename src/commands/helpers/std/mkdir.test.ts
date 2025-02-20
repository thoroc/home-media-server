import { assertEquals } from '@std/assert/equals';
import { describe, it } from 'jsr:@std/testing/bdd';
import { resolvesNext, returnsNext, stub } from 'jsr:@std/testing/mock';
import { mkdir } from './mkdir.ts';

describe('mkdir', () => {
  const TEST_SCENARIO = [
    { path: 'test', expected: 'tests/test' },
    { path: '${HMS_DIR}/test', expected: 'env_tests/test' },
  ];

  for (const { path, expected } of TEST_SCENARIO) {
    it(`should create directory for "${path}" at "${expected}"`, async () => {
      // Arrange
      using _denoEnvGet = stub(
        Deno.env,
        'get',
        returnsNext(['env_tests']),
      );
      using _denoMkDir = stub(
        Deno,
        'mkdir',
        resolvesNext([Promise.resolve(undefined)]),
      );

      // Act
      const actual = await mkdir(expected);

      // Assert
      assertEquals(actual, expected);
    });
  }
});
