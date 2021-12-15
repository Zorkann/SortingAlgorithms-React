import { useState, ChangeEvent, useEffect, useRef, useReducer } from "react";
import "./styles.css";
import {
  Menu,
  Columns,
  Comparisions,
  Header,
  ControlPanel
} from "./components";
import { generateRandomArray } from "./utils";
import { startBubbleSort, BubbleSortState } from "./algorithms/bubble";
import { startQuickSort, QuickSortState } from "./algorithms/quick";

type TypeOfSortState = BubbleSortState | QuickSortState;

type State = TypeOfSortState | undefined;

type ReducerState = {
  array: number[];
  arrayLength: number;
  sortWith: "quick" | "bubble" | undefined;
  state: "stop" | "play" | "pause" | "end";
  delay: number;
  data: TypeOfSortState | undefined;
};

type ActionType = "GENERATE_ARRAY";

type Action = {
  type: ActionType;
  payload: any;
};

function reducer(state: ReducerState, action: Action): ReducerState {
  switch (action.type) {
    case "GENERATE_ARRAY":
      return {
        ...state,
        array: generateRandomArray(action.payload),
        sortWith: undefined,
        data: undefined,
        state: "stop"
      };
  }
}

export default function App() {
  const [dispatch, state] = useReducer(reducer);
  const [array, setArray] = useState<number[]>([]);
  const [arrayLength, setArrayLength] = useState<number>(20);
  const [sortWith, setSortWith] = useState<"quick" | "bubble" | undefined>();
  const [state, setState] = useState<"stop" | "play" | "pause" | "end">("stop");
  const [delay, setDelay] = useState<number>(1);
  const [data, setData] = useState<State>();
  const generator = useRef<Generator<TypeOfSortState> | null>(null);
  const currentData = { ...data, arr: data?.arr || array };

  useEffect(() => {
    let id: number;
    if (state === "play") {
      if (generator.current === null) return;
      id = setInterval(() => {
        if (generator.current === null) {
          return clearInterval(id);
        }
        const { value, done } = generator.current.next();
        if (done) {
          clearInterval(id);
          return setState("end");
        }
        setData(value);
      }, delay);
    }
    return () => {
      clearInterval(id);
    };
  }, [sortWith, delay, state]);

  const onGenerateArrayClick = () => {
    setArray(generateRandomArray(arrayLength));
    setSortWith(undefined);
    generator.current = null;
    setData(undefined);
    setState("stop");
  };

  const onDelayChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDelay(Number(event.target.value));
  };

  const onArrayLengthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setArrayLength(Number(event.target.value));
  };

  const onQuickSortCLick = () => {
    setSortWith("quick");
    setState("stop");
    setData(undefined);
    generator.current = startQuickSort([...array], 0, array.length - 1);
  };

  const onBubbleSortClick = () => {
    setSortWith("bubble");
    setState("stop");
    setData(undefined);
    generator.current = startBubbleSort([...array]);
  };

  const onPlayClick = () => {
    if (state !== "pause") {
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
    setState("stop");
    setData(undefined);
    generator.current = null;
  };

  const onPauseClick = () => {
    setState("pause");
  };

  const onNextClick = () => {
    if (state === "pause") {
      const { value, done } = generator.current.next();
      if (done) {
        return setState("end");
      }
      return setData(value);
    }
    setState("pause");
  };

  return (
    <div className="App">
      <Header>
        <Comparisions sortWith={sortWith} comparisions={0} />
        <Menu
          onGenerateArrayClick={onGenerateArrayClick}
          onQuickSortCLick={onQuickSortCLick}
          onDelayChange={onDelayChange}
          onBubbleSortClick={onBubbleSortClick}
          onArrayLengthChange={onArrayLengthChange}
          arrayLength={arrayLength}
          delay={delay}
          sortWith={sortWith}
        />
        <ControlPanel
          onPauseClick={onPauseClick}
          onStopClick={onStopClick}
          onPlayClick={onPlayClick}
          onNextClick={onNextClick}
        />
      </Header>
      <Columns data={currentData} />
    </div>
  );
}
