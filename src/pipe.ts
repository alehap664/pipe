import './pipeSuite';

type Pipe<D = any, P = null> = {
  val: D;
  preVal: P;
  pipe: <T>(cb: (value: D) => T) => Pipe<T, D>;
  pipeAsync: <T>(cb: (value: D) => Promise<T>) => Promise<Pipe<Awaited<T>, D>>;
};

const createPipe = (val: any, preVal: any): Pipe => {
  return {
    preVal,
    val,
    pipe: (cb) => createPipe(cb(val), val),
    pipeAsync: async (cb) => {
      const nextVal = await cb(val);
      return createPipe(nextVal, val);
    }
  };
};

const pipe = <D = any>(val: D): Pipe<D> => {
  return createPipe(val, null);
};

export { type Pipe };
export { pipe };
