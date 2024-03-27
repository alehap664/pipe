// @ts-expect-error: No need check type
Object.prototype.pipe = function pipe(predicate) {
  return predicate(this);
};
type Pipe<D = any> = {
  pipe: <T>(predicate: (value: D) => T) => T extends Pipe<infer T> ? Pipe<T> : Pipe<T>;
};
const pipe = <D = any>(_: D) => _ as Pipe<D> & D;

export { type Pipe };
export { pipe };
