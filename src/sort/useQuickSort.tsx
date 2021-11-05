import { useState, useEffect, useRef } from "react";
import { setCalculate, timeout } from "./utils";

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
    comparisions.current += 1;
    await timeout(delay);
  };

  async function quickSort() {
    const id = (ref.current += 1);
    comparisions.current = 0;

    async function start(
      arr: number[] = [...array],
      i: number = 0,
      j: number = arr.length - 1
    ) {
      const calculate = setCalculate(arr, i, j);

      async function loop(): Promise<number[] | undefined> {
        const { done, ...rest } = calculate();
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
