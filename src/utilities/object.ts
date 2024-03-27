const get = <D extends Record<any, any>>(key: keyof D) => {
  return (data: D) => data[key];
};

export { get };
