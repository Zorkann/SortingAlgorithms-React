import { useState, ChangeEvent } from "react";
import "./styles.css";
import {
  Menu,
  Columns,
  Comparisions,
  Header,
  ControlPanel,
  Button
} from "./components";
import { useSortState, SortType } from "./useSortState/useSortState";
import { generateRandomArray } from "./utils";

export default function App() {
  const [array, setArray] = useState<number[]>([]);
  const [arrayLength, setArrayLength] = useState<number>(20);
  const [delay, setDelay] = useState<number>(100);
  const [sortWith, setSortWith] = useState<SortType>();
  const {
    data,
    onPauseClick,
    onStopClick,
    onPlayClick,
    onNextClick,
    onPrevClick
  } = useSortState({ array, sortWith, delay });

  const onGenerateArrayClick = () => {
    setArray(generateRandomArray(arrayLength));
  };

  const onSwitchSort = (sort: SortType) => {
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
        <Comparisions sortWith={sortWith} comparisions={data?.comparisions} />
        <Menu
          onGenerateArrayClick={onGenerateArrayClick}
          onDelayChange={onDelayChange}
          onSwitchSort={onSwitchSort}
          onArrayLengthChange={onArrayLengthChange}
          arrayLength={arrayLength}
          delay={delay}
          sortWith={sortWith}
        />
        <ControlPanel>
          <Button onClick={onPrevClick}>{"<"}</Button>
          <Button onClick={onStopClick}>Stop</Button>
          <Button onClick={onPlayClick}>Play</Button>
          <Button onClick={onPauseClick}>Pause</Button>
          <Button onClick={onNextClick}>{">"}</Button>
        </ControlPanel>
      </Header>
      <Columns data={{ ...data, arr: data?.arr || array }} />
    </div>
  );
}
