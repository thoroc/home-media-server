import { colors } from 'jsr:@cliffy/ansi@^1.0.0-rc.7/colors';
import 'jsr:@std/dotenv/load';
import { exists } from 'jsr:@std/fs';
import { GlobalOptions } from '../types.ts';

interface MkdirOptions extends GlobalOptions {
  allowed_dir: string[];
}

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
