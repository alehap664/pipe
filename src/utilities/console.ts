import { getDebugCodeLine } from '../shared';

const debug = (tag: string) => {
  return <T>(message: T) => {
    const codeLine = getDebugCodeLine();
    const formatTag = ` \x1b[34m(${tag})\x1b[0m`;
    console.log(`\x1b[32m[PIPE_DEBUG]\x1b[0m${formatTag}`, '>', message, `\x1b[90m${codeLine}\x1b[0m`);
    return message;
  };
};

export { debug };
