import { useState, useEffect, useRef } from "react";
import { timeout, setBubbleSort } from "./utils";

export type State = {
  i?: number;
  j?: number;
  arr?: number[];
};

type UseQuickSort = {
  delay: number;
  array: number[];
};

function useBubbleSort({ delay, array }: UseQuickSort) {
  const [state, setState] = useState<State>();
  const ref = useRef(0);
  const comparisions = useRef(0);

  useEffect(() => {
    ref.current += 1;
    comparisions.current = 0;
  }, [array]);

  const saveStep = async (args: State, comp: number, id: number) => {
    if (ref.current !== id) {
      comparisions.current = 0;
      return;
    }
    comparisions.current = comp;
    setState(args);
    await timeout(delay);
  };

  async function bubbleSort() {
    const id = (ref.current += 1);
    setBubbleSort(array, (args, comp) => saveStep(args, comp, id))();
  }

  return {
    state,
    bubbleSort,
    comparisions: comparisions.current
  };
}

export { useBubbleSort };
