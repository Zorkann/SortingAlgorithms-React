import { useState, useEffect, useRef } from "react";
import { timeout } from "./utils";
import { TypeOfSortState, TypesOfSort } from "./types";
import { startBubbleSort } from "../algorithms/bubble";
import { startQuickSort } from "../algorithms/quick";

type SaveStepHandler = (
  args: TypeOfSortState,
  id: number,
  comparisions: number
) => Promise<void>;

type UseQuickSort = {
  array: number[];
  delay: number;
};

type State = TypeOfSortState | undefined;

function useSort({ array, delay }: UseQuickSort) {
  const [sortWith, setSortWith] = useState<TypesOfSort>();
  const [state, setState] = useState<State>();
  const ref = useRef(0);
  const arr = state?.arr || array;
  const comparisionsRef = useRef(0);

  useEffect(() => {
    setState(undefined);
    setSortWith(undefined);
    ref.current += 1;
    comparisionsRef.current = 0;
  }, [array]);

  const saveStep: SaveStepHandler = async (args, id, comparisions) => {
    if (ref.current !== id) {
      return;
    }
    comparisionsRef.current = comparisions;

    setState(args);
    await timeout(delay);
  };

  async function start(sortWith: TypesOfSort) {
    const id = (ref.current += 1);
    setSortWith(sortWith);

    const cb = (args, comparisions) => saveStep(args, id, comparisions);

    if (sortWith === "quick") {
      await startQuickSort({ arr: array, cb });
    }

    if (sortWith === "bubble") {
      for (const val of startBubbleSort(array)) {
        const { comparisions, ...rest } = val;
        await saveStep(rest, id, comparisions);
      }
    }
  }

  return {
    start,
    data: { ...state, arr },
    sortWith,
    comparisions: comparisionsRef.current
  };
}

export { useSort };
