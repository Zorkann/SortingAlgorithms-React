import { useState, useEffect } from "react";
import { swap } from "./utils";
import { timeout } from "../utils/utils";

export type State = {
  i?: number;
  j?: number;
  arr: number[];
};

type UseQuickSort = {
  delay?: number;
  array: number[];
};

function useBubbleSort({ delay = 1, array }: UseQuickSort) {
  const [state, setState] = useState<State>({
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

  async function bubbleSort() {
    const arr = [...array];
    let len = array.length;
    let checked;
    do {
      checked = false;
      for (let i = 0; i < len; i++) {
        if (arr[i] > arr[i + 1]) {
          await saveStep({ arr: arr, i, j: i + 1 });
          swap(arr, i);
          await saveStep({ arr: arr, i, j: i + 1 });
          checked = true;
        }
      }
    } while (checked);
    return arr;
  }

  return { state, bubbleSort };
}

export { useBubbleSort };
