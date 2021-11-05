import { useState } from "react";
import { useBubbleSort } from "./useBubbleSort";
import { useQuickSort } from "./useQuickSort";

type UseQuickSort = {
  array: number[];
  delay?: number;
};

function useSort({ array = [], delay = 1 }: UseQuickSort) {
  const [sortWith, setSortWith] = useState<string>();
  const { state: bubbleState, bubbleSort } = useBubbleSort({
    delay,
    array
  });

  const { state: quickState, quickSort } = useQuickSort({
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
    return { start, data: bubbleState };
  }

  if (sortWith === "quick") {
    return { start, data: quickState };
  }

  return {
    start,
    data: {
      arr: array
    }
  };
}

export { useSort };
