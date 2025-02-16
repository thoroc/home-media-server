import 'jsr:@std/dotenv/load';
import { exists } from 'jsr:@std/fs';
import chalk from 'npm:chalk';

interface MkdirOptions {
  allowed_dir: string[];
}

export const mkdir = async (
  path: string,
  options?: MkdirOptions
): Promise<void> => {
  const currentPath = path.replace('${HMS_DIR}', Deno.env.get('HMS_DIR') || '');

  try {
    if (await exists(currentPath)) {
      console.log(`Directory "${chalk.yellow(currentPath)}" already exists.`);
    } else {
      if (options?.allowed_dir) {
        const allowed = options.allowed_dir.some((dir) =>
          currentPath.startsWith(dir)
        );
        if (!allowed) {
          console.error(
            chalk.redBright(
              `Creating directory "${currentPath}" is not allowed.`
            )
          );
          return;
        }
      }
      console.log(`Creating volume directory "${chalk.green(currentPath)}"...`);
      await Deno.mkdir(currentPath, { recursive: true });
    }
  } catch (error) {
    if (error instanceof Deno.errors.AlreadyExists) {
      console.log(`Directory "${currentPath}" already exists.`);
    } else {
      throw error;
    }
  }
};
