import { useState, useEffect } from "react";
import { useBubbleSort } from "./useBubbleSort";
import { useQuickSort } from "./useQuickSort";

type UseQuickSort = {
  array: number[];
  delay: number;
};

function useSort({ array = [], delay }: UseQuickSort) {
  const [sortWith, setSortWith] = useState<"bubble" | "quick">();
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

  useEffect(() => {
    setSortWith(undefined);
  }, [array]);

  async function start(sortWith: "quick" | "bubble") {
    if (!array.length) return;
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
    },
    comparisions: 0
  };
}

export { useSort };
