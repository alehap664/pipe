import { getDebugCodeLine, getLogCodeLine } from '../shared';

const debug = (tag: string) => {
  return <T>(message: T) => {
    if (process.env.NODE_ENV !== 'production') {
      const codeLine = getDebugCodeLine();
      const name = '\x1b[2m\x1b[32m[PIPE_DEBUG]\x1b[0m';
      const formatTag = `\x1b[1m\x1b[34m[${tag}]\x1b[0m`;
      console.log(`\x1b[2m${codeLine}\x1b[0m`, `${name} ${formatTag}`);
      console.log(message, '\n');
    }
    return message;
  };
};

const log = (message: string) => {
  if (process.env.NODE_ENV !== 'production') {
    const codeLine = getLogCodeLine();
    const name = '\x1b[2m\x1b[32m[PIPE_LOG]\x1b[0m';
    const formatMessage = `\x1b[1m\x1b[34m${message}\x1b[0m`;
    console.log(`\x1b[2m${codeLine}\x1b[0m`, `${name}`, `${formatMessage}`);
  }
  return <T>(data: T) => {
    return data;
  };
};

export { debug, log };
