import { useState, useEffect, useRef } from "react";
import { swap, timeout } from "./utils";

export type State = {
  i?: number;
  j?: number;
  arr: number[];
};

type UseQuickSort = {
  delay: number;
  array: number[];
};

function useBubbleSort({ delay, array }: UseQuickSort) {
  const [state, setState] = useState<State>({
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

  async function bubbleSort() {
    const id = (ref.current += 1);
    comparisions.current = 0;

    const arr = [...array];
    let len = array.length;
    let checked;
    do {
      checked = false;
      for (let i = 0; i < len; i++) {
        if (arr[i] > arr[i + 1]) {
          await saveStep({ arr: arr, i, j: i + 1 }, id);
          swap(arr, i);
          await saveStep({ arr: arr, i, j: i + 1 }, id);
          comparisions.current += 1;
          checked = true;
        }
      }
    } while (checked);
    return arr;
  }

  return { state, bubbleSort, comparisions: comparisions.current };
}

export { useBubbleSort };
