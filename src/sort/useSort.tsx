import { useState } from "react";
import { useBubbleSort } from "./useBubbleSort";
import { useQuickSort } from "./useQuickSort";

type UseQuickSort = {
  array: number[];
  delay: number;
};

function useSort({ array = [], delay }: UseQuickSort) {
  const [sortWith, setSortWith] = useState<string>();
  const {
    state: bubbleState,
    bubbleSort,
    comparisions: bubbleComparisions
  } = useBubbleSort({
    delay,
    array
  });

  const {
    state: quickState,
    quickSort,
    comparisions: quickComparisions
  } = useQuickSort({
    delay,
    array
  });

  async function start(sortWith: "quick" | "bubble") {
    setSortWith(sortWith);

    if (sortWith === "quick") {
      await quickSort();
    }

    if (sortWith === "bubble") {
      await bubbleSort();
    }
  }

  if (sortWith === "bubble") {
    return {
      start,
      data: bubbleState,
      comparisions: bubbleComparisions,
      sortWith
    };
  }

  if (sortWith === "quick") {
    return {
      start,
      data: quickState,
      comparisions: quickComparisions,
      sortWith
    };
  }

  return {
    start,
    data: {
      arr: array
    }
  };
}

export { useSort };
