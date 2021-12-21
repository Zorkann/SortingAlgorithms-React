import { useRef, useCallback, useEffect, useState } from "react";
import { startBubbleSort, BubbleSortState } from "../algorithms/bubble";
import { startQuickSort, QuickSortState } from "../algorithms/quick";

export type SortType = "quick" | "bubble" | undefined;
type State = "stop" | "play" | "pause" | "end";
type SortState = BubbleSortState | QuickSortState;
type GeneratorType = Generator<SortState, SortState | undefined>;

type useSortStateProps = {
  array: number[];
  sortWith: SortType;
  delay?: number;
};

const initGenerator = (array: number[], sortWith: SortType) => {
  if (sortWith === "quick") {
    return startQuickSort(array);
  }
  if (sortWith === "bubble") {
    return startBubbleSort(array);
  }

  return null;
};

const useSortState = ({ array, sortWith, delay = 0 }: useSortStateProps) => {
  const [sortingSteps, setSortingSteps] = useState<SortState[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [state, setState] = useState<State>("stop");
  const generator = useRef<GeneratorType | null>(null);
  const data = sortingSteps[sortingSteps.length - 1 + currentStep];

  const processStep = useCallback(() => {
    if (generator.current === null) return;
    const { value, done } = generator.current.next();

    if (done) {
      setState("end");
    }

    if (value) {
      return setSortingSteps((steps) => [...steps, value]);
    }
  }, []);

  const resetProcess = useCallback(() => {
    setState("stop");
    setSortingSteps([]);
    generator.current = null;
  }, []);

  const startProcess = () => {
    generator.current = initGenerator(array, sortWith);
  };

  const prevStep = () => {
    return setCurrentStep((step) =>
      Math.abs(step) === sortingSteps.length ? step : step - 1
    );
  };

  const nextStep = useCallback(() => {
    if (currentStep < 0) {
      return setCurrentStep((step) => step + 1);
    }

    return processStep();
  }, [currentStep, processStep]);

  useEffect(() => {
    resetProcess();
  }, [array, sortWith, resetProcess]);

  useEffect(() => {
    let id: number;
    if (state === "play") {
      id = setInterval(nextStep, delay);
    }
    return () => {
      clearInterval(id);
    };
  }, [sortWith, delay, state, nextStep]);

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
    if (state === "stop" || state === "end") return;
    setState("pause");
  };

  const onNextClick = () => {
    if (state === "play") {
      return setState("pause");
    }

    if (state === "end") return;

    if (state === "stop") {
      startProcess();
      setState("pause");
    }

    return nextStep();
  };

  const onPrevClick = () => {
    if (state === "play") {
      return setState("pause");
    }

    if (state === "stop") return;

    if (state === "end") {
      setState("pause");
    }
    return prevStep();
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
