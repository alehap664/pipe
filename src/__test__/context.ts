const createContext = () => {
  const material = {
    rice: 10,
    chicken: 5,
    beef: 1,
    cheese: 1
  };
  const materialFor = {
    'rice-chicken': {
      rice: 5,
      chicken: 2
    },
    hamburger: {
      beef: 1,
      cheese: 1
    }
  };
  const data = [
    {
      id: 1,
      name: 'rice-chicken',
      count: 2
    },
    {
      id: 2,
      name: 'hamburger',
      count: 3
    }
  ];
  const createOrder = () => {
    return {
      countOrder: data.length,
      materialLost: {},
      orders: data,
      status: 'Processing',
      error: ''
    };
  };

  const checkResource = (ctx: any) => {
    ctx.orders.forEach((order) => {
      const material = materialFor[order.name];
      Object.keys(material).forEach((key) => {
        const count = ctx.materialLost[key] ?? 0;
        ctx.materialLost[key] = count + material[key] * order.count;
      });
    });
    return ctx;
  };

  const checkOrder = (ctx: any) => {
    for (const key in ctx.materialLost) {
      if (material[key] < ctx.materialLost[key]) {
        ctx.status = 'Denied';
        ctx.error = `${key} is have ${material[key]}, but request need ${ctx.materialLost[key]}`;
        return ctx;
      }
    }

    ctx.status = 'Accepted';
    ctx.error = '';
    return ctx;
  };

  const refillMaterial = () => {
    material.beef += 2;
    material.cheese += 2;
    material.chicken += 2;
    material.rice += 2;
  };

  const requestRefillMaterial = async (ctx: any) => {
    await new Promise((res) => setTimeout(() => res(true), 2000));
    refillMaterial();
    return ctx;
  };

  const cancelOrder = (ctx: any) => {
    return ctx;
  };

  const makeTaste = (ctx: any) => {
    return ctx;
  };

  const afterRefillAndCheckOrder = (ctx: any) => {
    if (ctx.status === 'Denied') {
      return cancelOrder(ctx);
    } else {
      return makeTaste(ctx);
    }
  };

  return {
    material,
    materialFor,
    data,
    createOrder,
    checkResource,
    checkOrder,
    refillMaterial,
    requestRefillMaterial,
    cancelOrder,
    makeTaste,
    afterRefillAndCheckOrder
  };
};

export const context = createContext();
