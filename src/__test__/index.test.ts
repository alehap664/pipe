import { describe, expect, test } from 'vitest';

import { filter, map, pipe, reduce } from '../index';
import { context } from './context';

const duple = (x: number) => x * 2;
const dupleWhenEven = (x: number, index) => (even(index) ? x * 2 : x);
const triple = (x: number) => x * 3;
const sum = (x: number, y: number) => x + y;
const even = (x: number) => x % 2 === 0;
const odd = (x: number) => x % 3 === 0;
const duplicate10 = (x: number) => Array.from<number>({ length: 10 }).fill(x);
const getFirst = (x: number[]) => x[0];

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe('Test', () => {
  test('Test case 1', () => {
    const result = pipe(list)
      .pipe(map(duple))
      .pipe(reduce(sum))
      .pipe((data) => (even(data) ? triple(data) : duple(data)));

    const dupleList = list.map(duple);
    const sumList = dupleList.reduce(sum);
    const total = even(sumList) ? triple(sumList) : duple(sumList);

    expect(result.val).toEqual(total);
  });

  test('Test case 2', () => {
    const result = pipe(list)
      .pipe(filter(even))
      .pipe(map(dupleWhenEven))
      .pipe(reduce(sum))
      .pipe(duplicate10)
      .pipe(map(duple))
      .pipe(filter(odd))
      .pipe(getFirst);

    const evenList = list.filter(even);
    const dupleWhenEvenList = evenList.map(dupleWhenEven);
    const total = dupleWhenEvenList.reduce(sum);
    const duplicate10List = duplicate10(total);
    const dupleList = duplicate10List.map(duple);
    const oddList = dupleList.filter(odd);
    const first = getFirst(oddList);

    expect(result.preVal).toEqual(oddList);
    expect(result.val).toEqual(first);
  });

  test('Test case 3', async () => {
    const orderPipe = pipe(context.data)
      .pipe(context.createOrder)
      .pipe(context.checkResource)
      .pipe(context.checkOrder);

    if (orderPipe.val.status === 'Denied') {
      await orderPipe.pipeAsync(context.requestRefillMaterial);
      orderPipe.pipe(context.checkOrder).pipe(context.afterRefillAndCheckOrder);
    } else {
      orderPipe.pipe(context.makeTaste);
    }

    // console.log(orderPipe.val);
  });
});
