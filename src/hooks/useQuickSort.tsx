import { useState, useEffect, useRef } from "react";
import { timeout } from "../utils/utils";

export type State = {
  p?: number;
  pi?: number;
  i?: number;
  j?: number;
  arr: number[];
};

type UseQuickSort = {
  delay: number;
  array: number[];
};

function useQuickSort({ array, delay }: UseQuickSort) {
  const [state, setState] = useState<State>({
    p: undefined,
    pi: undefined,
    i: undefined,
    j: undefined,
    arr: []
  });
  const ref = useRef(0);
  const comparisions = useRef(0);

  useEffect(() => {
    ref.current += 1;
    comparisions.current = 0;
    setState({
      arr: array
    });
  }, [array]);

  const saveStep = async (args: State, id: number) => {
    if (ref.current !== id) {
      comparisions.current = 0;
      return;
    }
    setState(args);
    await timeout(delay);
  };

  function setCalculate(
    arr: number[],
    i: number,
    j: number,
    p: number,
    pi: number
  ) {
    return async function (id: number) {
      if (i <= j) {
        if (arr[i] < p) {
          i++;
          return { done: false, i, j, arr, pi, p };
        }

        if (arr[j] > p) {
          j--;
          return { done: false, i, j, arr, pi, p };
        }

        if (i <= j) {
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;

          await saveStep({ arr, i, j, p, pi }, id);

          i++;
          j--;

          if (i - 1 === pi) {
            pi = j + 1;
            return { done: false, i, j, arr, pi, p };
          }
          if (j + 1 === pi) {
            pi = i - 1;
            return { done: false, i, j, arr, pi, p };
          }
          return { done: false, i, j, arr, pi, p };
        }
      }
      return {
        done: true,
        i,
        j,
        arr,
        pi,
        p
      };
    };
  }

  async function quickSort() {
    const id = (ref.current += 1);
    comparisions.current = 1;

    async function start(
      arr: number[] = [...array],
      i: number = 0,
      j: number = arr.length - 1
    ) {
      const pi = Math.floor((i + j) / 2);
      const p = arr[pi];

      await saveStep({ arr, i, j, pi, p }, id);

      const calculate = setCalculate(arr, i, j, p, pi);

      async function loop(): Promise<number[] | undefined> {
        const { done, ...rest } = await calculate(id);
        comparisions.current += 1;
        await saveStep(rest, id);

        if (done) {
          if (i < rest.i - 1) {
            //more elements on the left side of the pivot
            await start(arr, i, rest.i - 1);
          }
          if (rest.i < j) {
            //more elements on the right side of the pivot
            await start(arr, rest.i, j);
          }
          return arr;
        }

        return loop();
      }

      return await loop();
    }
    return await start();
  }

  return { state, quickSort, comparisions: comparisions.current };
}

export { useQuickSort };
