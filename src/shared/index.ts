const getStack = () => {
  try {
    throw new Error();
  } catch (e) {
    if (e instanceof Error && e.stack) return e.stack;
  }
  return '';
};

const normalize = (value: string) => value.trim().replace('at ', '');

const getDebugCodeLine = () => {
  // 1 at getStack
  // 2 at getDebugCodeLine (this)
  // 3 at debug
  // 4 is placement call function debug
  const depth = 4;
  const stack = getStack();
  const traces = stack.split('\n');

  const pipeIndex = traces.findIndex((value) => value.match(/at .+\.pipe/));

  // Out side pipe
  if (pipeIndex === -1) return normalize(traces[depth]);
  if (pipeIndex > depth) return normalize(traces[pipeIndex - 1]);
  return normalize(traces[pipeIndex + 1]);
};

const getLogCodeLine = () => {
  // 1 at getStack
  // 2 at getDebugCodeLine (this)
  // 3 at log
  const depth = 3;
  const stack = getStack();
  const traces = stack.split('\n');

  return normalize(traces[depth + 1]);
};

export { getDebugCodeLine, getLogCodeLine };
