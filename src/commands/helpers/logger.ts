import { ILogObj, Logger } from 'npm:tslog';

export const log: Logger<ILogObj> = new Logger({
  stylePrettyLogs: true,
});
