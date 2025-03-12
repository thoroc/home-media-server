import { GlobalOptions } from '@scope/commands';
import { colors } from 'jsr:@cliffy/ansi@^1.0.0-rc.7/colors';
import 'jsr:@std/dotenv/load';
import { exists } from 'jsr:@std/fs';

interface MkdirOptions extends GlobalOptions {
  allowed_dir: string[];
}

/**
 * Asynchronously creates a directory at the specified path.
 *
 * @param path - The path where the directory should be created. The placeholder `${HMS_DIR}` will be replaced with the value of the `HMS_DIR` environment variable.
 * @param options - Optional settings for directory creation.
 * @param options.verbose - If true, logs messages about the directory creation process.
 * @param options.allowed_dir - An array of allowed directory paths. If specified, the directory will only be created if the path starts with one of these allowed paths.
 * @returns A promise that resolves to the created directory path, or void if the directory already exists or creation is not allowed.
 *
 * @throws Will throw an error if the directory creation fails for reasons other than the directory already existing.
 */
export const mkdir = async (
  path: string,
  options?: MkdirOptions,
): Promise<string | void> => {
  const currentPath = path.replace('${HMS_DIR}', Deno.env.get('HMS_DIR') || '');

  if (options?.verbose) {
    console.log(`Creating directory "${colors.yellow(currentPath)}"...`);
  }

  try {
    if (await exists(currentPath)) {
      console.log(`Directory "${colors.yellow(currentPath)}" already exists.`);
    } else {
      if (options?.allowed_dir) {
        const allowed = options.allowed_dir.some((dir) =>
          currentPath.startsWith(dir)
        );
        if (!allowed) {
          console.error(
            colors.brightRed(
              `Creating directory "${currentPath}" is not allowed.`,
            ),
          );
          return;
        }
      }
      console.log(
        `Creating volume directory "${colors.green(currentPath)}"...`,
      );
      await Deno.mkdir(currentPath, { recursive: true });
    }
    return currentPath;
  } catch (error) {
    if (error instanceof Deno.errors.AlreadyExists) {
      console.log(`Directory "${currentPath}" already exists.`);
    } else {
      throw error;
    }
  }
};
