import { logger } from '../utils/logger';
import util from 'util';
import { HookContext } from '@feathersjs/feathers';

// To see more detailed messages, uncomment the following line:
logger.level = 'debug';

export default function () {
  return (context: HookContext) => {
    const { params } = context;
    const requestId = params.requestId;
    logger.debug(`Request Id: ${requestId}`);
    // This debugs the service call and a stringified version of the hook context
    // You can customize the message (and logger) to your needs
    logger.debug(
      `${context.type} app.service('${context.path}').${context.method}()`,
    );

    if (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      typeof (context as any).toJSON === 'function' &&
      logger.level === 'debug'
    ) {
      logger.debug('Hook Context', util.inspect(context, { colors: false }));
    }

    if (context.error && !context.result) {
      logger.error(context.error.stack);
    }
  };
}
