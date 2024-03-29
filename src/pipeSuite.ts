type Pipes<T extends string> = {
  [key in T]: () => Pipes<T>;
};

type Suite<T, P extends string> = {
  context: T;
  pipes: Pipes<P>;
};

type Params<T, P extends string> = {
  assign: (callbackFn: (params: { context: T; pipes: Pipes<P> }) => void) => any;
};

const createPipeSuite = <T, P extends string>(callbackFn: (params: Params<any, any>) => Suite<T, P>) => {
  function assign(callbackFn: (suite: Suite<any, any>) => void) {
    return () => {
      callbackFn({ context: suite.context, pipes: suite.pipes });
      return suite.pipes;
    };
  }

  const suite = callbackFn({ assign });
  return suite;
};

const withSuite = <T, P extends string>(suite: Suite<T, P>, context?: T extends (first: infer C, ...args: any[]) => any ? C : undefined) => {
  if (typeof suite.context === 'function') {
    suite.context = suite.context(context);
  }
  return suite;
};

const suite = createPipeSuite(({ assign }) => ({
  context: ({ input }: { input: { count: number } }) => ({
    count: input.count
  }),
  pipes: {
    checkResource: assign(({ context, pipes }) => {
      pipes.log();
      context.count += 1;
    }),
    log: assign(({ context }) => {
      console.log({ context });
    })
  }
}));

const suiteInstance = withSuite(suite, { input: { count: 10 } });

suiteInstance.pipes.checkResource().checkResource().checkResource();
console.log(suiteInstance.context);

// const withSuite = (suite: Suite, context: D) => {
//   if (typeof context === 'function') {
//     suite.context = suite.context(context);
//   }
// };

// const useCase = withSuite(suite, {
//   input: { count: 1 }
// });

// suite.pipes.checkResource.

// const order = suite.createOrder().checkResource().checkOrder();
// order.checkStatus()
// await order.requestRefillMaterial()
