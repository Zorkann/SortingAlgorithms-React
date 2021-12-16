import { useState, ChangeEvent, useEffect } from "react";
import "./styles.css";
import {
  Menu,
  Columns,
  Comparisions,
  Header,
  ControlPanel
} from "./components";
import { useSortState } from "./useSortState/useSortState";
import { generateRandomArray } from "./utils";

export default function App() {
  const [array, setArray] = useState<number[]>([]);
  const [arrayLength, setArrayLength] = useState<number>(20);
  const [delay, setDelay] = useState<number>(100);
  const [sortWith, setSortWith] = useState<"quick" | "bubble" | undefined>();
  const {
    data,
    onPauseClick,
    onStopClick,
    onPlayClick,
    onNextClick
  } = useSortState({ array, sortWith, delay });

  const onGenerateArrayClick = () => {
    setArray(generateRandomArray(arrayLength));
  };

  const onSwitchSort = (sort: "quick" | "bubble") => {
    setSortWith(sort);
  };

  const onDelayChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDelay(Math.abs(Number(event.target.value)));
  };

  const onArrayLengthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setArrayLength(Number(event.target.value));
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
