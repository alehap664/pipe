type Reduce = {
  <D = any>(callbackfn: (previousValue: D, currentValue: D, currentIndex: number, array: D[]) => D): (data: D[]) => D;
  <D = any>(callbackfn: (previousValue: D, currentValue: D, currentIndex: number, array: D[]) => D, initialValue: D): (data: D[]) => D;
  <D = any, T = any>(callbackfn: (previousValue: T, currentValue: D, currentIndex: number, array: D[]) => T, initialValue: T): (data: D[]) => T;
};

const map = <D = any>(callbackfn: (value: D, index: number, array: D[]) => D, thisArg?: D[]) => {
  return (data: D[]) => data.map<D>(callbackfn, thisArg);
};

const filter = <D = any>(predicate: (value: D, index: number, array: D[]) => boolean, thisArg?: any) => {
  return (data: D[]) => data.filter(predicate, thisArg);
};

const reduce: Reduce = (...params: any[]) => {
  const [callbackfn, initialValue] = params;
  return (data: any[]) => data.reduce(callbackfn, initialValue ?? null);
};

export { filter, map, reduce };
