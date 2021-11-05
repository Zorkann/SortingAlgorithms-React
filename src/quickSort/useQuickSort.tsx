import { useState, useEffect } from "react";
import { timeout } from "../utils/utils";
import { setCalculate } from "./utils";

export type State = {
  p?: number;
  pi?: number;
  i?: number;
  j?: number;
  arr: number[];
};

type UseQuickSort = {
  delay?: number;
  array: number[];
};

function useQuickSort({ array, delay = 1 }: UseQuickSort) {
  const [state, setState] = useState<State>({
    p: undefined,
    pi: undefined,
    i: undefined,
    j: undefined,
    arr: []
  });

  useEffect(() => {
    setState({
      arr: array
    });
  }, [array]);

  const saveStep = async (args: State) => {
    setState(args);
    await timeout(delay);
  };

  async function quickSort(
    arr: number[] = [...array],
    i: number = 0,
    j: number = arr.length - 1
  ) {
    const calculate = setCalculate(arr, i, j);

    async function loop(): Promise<number[] | undefined> {
      const { done, ...rest } = calculate();
      await saveStep(rest);

      if (done) {
        if (i < rest.i - 1) {
          //more elements on the left side of the pivot
          await quickSort(arr, i, rest.i - 1);
        }
        if (rest.i < j) {
          //more elements on the right side of the pivot
          await quickSort(arr, rest.i, j);
        }
        return arr;
      }

      return loop();
    }

    return await loop();
  }

  return { state, quickSort };
}

export { useQuickSort };
