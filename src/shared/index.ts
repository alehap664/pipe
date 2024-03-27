const getStack = () => {
  try {
    throw new Error();
  } catch (e) {
    if (e instanceof Error && e.stack) return e.stack;
  }
  return '';
};

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
  if (pipeIndex === -1) return traces[depth].trim();
  if (pipeIndex > depth) return traces[pipeIndex - 1].trim();
  return traces[pipeIndex + 1].trim();
};

export { getDebugCodeLine };
