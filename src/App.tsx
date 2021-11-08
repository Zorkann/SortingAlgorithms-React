import { useState, ChangeEvent } from "react";
import "./styles.css";
import Menu from "./components/Menu";
import Columns from "./components/Columns";
import Comparisions from "./components/Comparisions";
import Header from "./components/Header";
import { useSort } from "./hooks/useSort";

function generateRandomArray() {
  return new Array(40)
    .fill(undefined)
    .map(() => Math.round(Math.random() * 40));
}

export default function App() {
  const [array, setArray] = useState<number[]>([]);
  const [delay, setDelay] = useState<number>(1);
  const { data, start, comparisions, sortWith } = useSort({
    array,
    delay
  });

  const onGenerateArrayClick = () => {
    setArray(generateRandomArray());
  };

  const onDelayChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDelay(Number(event.target.value));
  };

  const onQuickSortCLick = async () => {
    await start("quick");
  };

  const onBubbleSortClick = async () => {
    await start("bubble");
  };

  return (
    <div className="App">
      <Header>
        <Comparisions sortWith={sortWith} comparisions={comparisions} />
        <Menu
          onGenerateArrayClick={onGenerateArrayClick}
          onQuickSortCLick={onQuickSortCLick}
          onDelayChange={onDelayChange}
          onBubbleSortClick={onBubbleSortClick}
          delay={delay}
          sortWith={sortWith}
        />
      </Header>
      <Columns data={data} />
    </div>
  );
}
