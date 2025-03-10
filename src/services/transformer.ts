import { Separator, SeparatorType } from './types.ts';

/**
 * Transforms an object into an array of strings, where each string is a key-value pair
 * concatenated with a specified separator.
 *
 * @param obj - The object to be transformed. Each key-value pair in the object will be converted to a string.
 * @param sep - The separator to use between keys and values in the resulting strings. Defaults to `Separator.COLUMN`.
 * @returns An array of strings, each representing a key-value pair from the object.
 */
export const transformObjectToArray = (
  obj: Record<string, any>,
  sep: SeparatorType = Separator.COLUMN,
) => Object.keys(obj).map((key) => `${key}${sep}${obj[key]}`);

/**
 * Transforms an array of strings into an object.
 * Each string in the array should contain a key and a value separated by a specified separator.
 *
 * @param arr - The array of strings to transform.
 * @param sep - The separator used to split each string into a key and value. Defaults to `Separator.COLUMN`.
 * @returns An object where each key-value pair is derived from the strings in the array.
 */
export const transformArrayToObject = (
  arr: string[],
  sep: SeparatorType = Separator.COLUMN,
) =>
  arr.reduce((acc: Record<string, any>, item) => {
    const [key, value] = item.split(sep);
    acc[key] = value;
    return acc;
  }, {});
