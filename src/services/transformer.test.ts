import { assertEquals } from '@std/assert/equals';
import { describe, it } from 'jsr:@std/testing/bdd';
import { transformObjectToArray } from './transformer.ts';
import { Separator } from './types.ts';

describe('transformObjectToArray', () => {
  it('should transform an object into an array of strings', () => {
    // Arrange
    const obj = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    };

    // Act
    const result = transformObjectToArray(obj);

    // Assert
    assertEquals(result, ['key1:value1', 'key2:value2', 'key3:value3']);
  });

  const scenario = [
    { separator: Separator.COLUMN },
    { separator: Separator.EQUAL },
  ];

  for (const { separator } of scenario) {
    it(`should transform an object into an array of strings with a custom separator: ${separator}`, () => {
      // Arrange
      const obj = {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
      };

      // Act
      const result = transformObjectToArray(obj, separator);

      // Assert
      assertEquals(result, [
        `key1${separator}value1`,
        `key2${separator}value2`,
        `key3${separator}value3`,
      ]);
    });
  }
});
