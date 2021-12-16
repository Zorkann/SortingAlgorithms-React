import { useRef, useCallback, useEffect, useState } from "react";
import { startBubbleSort, BubbleSortState } from "../algorithms/bubble";
import { startQuickSort, QuickSortState } from "../algorithms/quick";

type useSortStateProps = {
  array: number[];
  sortWith: "quick" | "bubble" | undefined;
  delay?: number;
};

const useSortState = ({ array, sortWith, delay = 0 }: useSortStateProps) => {
  const [data, setData] = useState<
    BubbleSortState | QuickSortState | undefined
  >();
  const [state, setState] = useState<"stop" | "play" | "pause" | "end">("stop");
  const generator = useRef<Generator<BubbleSortState | QuickSortState> | null>(
    null
  );

  const processStep = useCallback(() => {
    if (generator.current === null) return;
    const { value, done } = generator.current.next();
    if (done) {
      return setState("end");
    }
    setData(value);
  }, []);

  const resetProcess = useCallback(() => {
    setState("stop");
    setData(undefined);
    generator.current = null;
  }, []);

  useEffect(() => {
    resetProcess();
  }, [array, sortWith, resetProcess]);

  useEffect(() => {
    let id: number;
    if (state === "play") {
      id = setInterval(processStep, delay);
    }
    return () => {
      clearInterval(id);
    };
  }, [sortWith, delay, state, processStep]);

  const onPlayClick = () => {
    if (state === "play") return;
    if (state === "stop" || state === "end") {
      if (sortWith === "quick") {
        generator.current = startQuickSort([...array], 0, array.length - 1);
      }
      if (sortWith === "bubble") {
        generator.current = startBubbleSort([...array]);
      }
    }
    setState("play");
  };

  const onStopClick = () => {
    resetProcess();
  };

  const onPauseClick = () => {
    setState("pause");
  };

  const onNextClick = () => {
    if (state !== "pause") {
      return setState("pause");
    }
    processStep();
  };

  return {
    data,
    onPlayClick,
    onStopClick,
    onPauseClick,
    onNextClick
  };
};

export { useSortState };
