import { useRef, useCallback, useEffect, useState } from "react";
import { startBubbleSort, BubbleSortState } from "../algorithms/bubble";
import { startQuickSort, QuickSortState } from "../algorithms/quick";

type useSortStateProps = {
  array: number[];
  sortWith: "quick" | "bubble" | undefined;
  delay?: number;
};

const useSortState = ({ array, sortWith, delay = 0 }: useSortStateProps) => {
  const [historyData, setHistoryData] = useState<
    (BubbleSortState | QuickSortState)[]
  >([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [state, setState] = useState<"stop" | "play" | "pause" | "end">("stop");
  const generator = useRef<Generator<BubbleSortState | QuickSortState> | null>(
    null
  );
  const data = historyData[historyData.length - 1 + currentStep];

  const processStep = useCallback(() => {
    if (generator.current === null) return;
    if (currentStep < 0) {
      return setCurrentStep((step) => step + 1);
    }
    const { value, done } = generator.current.next();

    if (done) {
      setState("end");
    }

    if (value) {
      return setHistoryData((prev) => [...prev, value]);
    }
  }, [currentStep]);

  const resetProcess = useCallback(() => {
    setState("stop");
    setHistoryData([]);
    generator.current = null;
  }, []);

  const startProcess = () => {
    if (sortWith === "quick") {
      generator.current = startQuickSort(array);
    }
    if (sortWith === "bubble") {
      generator.current = startBubbleSort(array);
    }
  };

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
      startProcess();
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
    if (state === "play") {
      return setState("pause");
    }

    if (state === "stop") {
      startProcess();
      setState("pause");
    }

    return processStep();
  };

  const onPrevClick = () => {
    if (state === "play") {
      return setState("pause");
    }

    if (state === "end") {
      setState("pause");
    }
    return setCurrentStep((step) =>
      Math.abs(step) === historyData.length ? step : step - 1
    );
  };

  return {
    data,
    onPlayClick,
    onStopClick,
    onPauseClick,
    onNextClick,
    onPrevClick
  };
};

export { useSortState };
