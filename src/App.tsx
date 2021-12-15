import { useState, ChangeEvent, useEffect, useRef, useReducer } from "react";
import "./styles.css";
import {
  Menu,
  Columns,
  Comparisions,
  Header,
  ControlPanel
} from "./components";
import { startBubbleSort, BubbleSortState } from "./algorithms/bubble";
import { startQuickSort, QuickSortState } from "./algorithms/quick";
import { reducer, initialState } from "./state";

export default function App() {
  const [{ array, sortWith, state, data }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [arrayLength, setArrayLength] = useState<number>(20);
  const [delay, setDelay] = useState<number>(1);
  const generator = useRef<Generator<BubbleSortState | QuickSortState> | null>(
    null
  );

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
          return dispatch({ type: "SET_STATE", payload: "end" });
        }
        dispatch({ type: "SET_DATA", payload: value });
      }, delay);
    }
    return () => {
      clearInterval(id);
    };
  }, [sortWith, delay, state]);

  const onGenerateArrayClick = () => {
    dispatch({ type: "GENERATE_ARRAY", payload: arrayLength });
    generator.current = null;
  };

  const onDelayChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDelay(Number(event.target.value));
  };

  const onArrayLengthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setArrayLength(Number(event.target.value));
  };

  const onSwitchSort = (sort: "quick" | "bubble") => {
    if (sortWith === sort) return;
    dispatch({ type: "SET_SORT", payload: sort });
    generator.current = null;
  };

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
    dispatch({ type: "SET_STATE", payload: "play" });
  };

  const onStopClick = () => {
    dispatch({ type: "SET_STATE", payload: "stop" });
    generator.current = null;
  };

  const onPauseClick = () => {
    dispatch({ type: "SET_STATE", payload: "pause" });
  };

  const onNextClick = () => {
    if (state !== "pause")
      return dispatch({ type: "SET_STATE", payload: "pause" });

    const { value, done } = generator.current.next();
    if (done) {
      return dispatch({ type: "SET_STATE", payload: "end" });
    }
    return dispatch({ type: "SET_DATA", payload: value });
  };

  return (
    <div className="App">
      <Header>
        <Comparisions sortWith={sortWith} comparisions={0} />
        <Menu
          onGenerateArrayClick={onGenerateArrayClick}
          onDelayChange={onDelayChange}
          onSwitchSort={onSwitchSort}
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
      <Columns data={{ ...data, arr: data?.arr || array }} />
    </div>
  );
}
