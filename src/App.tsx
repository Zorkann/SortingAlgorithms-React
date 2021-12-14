import { useState, ChangeEvent, useEffect, useRef } from "react";
import "./styles.css";
import { Menu, Columns, Comparisions, Header } from "./components";
import { generateRandomArray } from "./utils";
import { startBubbleSort, BubbleSortState } from "./algorithms/bubble";
import { startQuickSort, QuickSortState } from "./algorithms/quick";

type TypeOfSortState = BubbleSortState | QuickSortState;

type State = TypeOfSortState | undefined;

export default function App() {
  const [array, setArray] = useState<number[]>([]);
  const [arrayLength, setArrayLength] = useState<number>(20);
  const [sortWith, setSortWith] = useState<"quick" | "bubble" | undefined>();
  const [delay, setDelay] = useState<number>(1);
  const [data, setData] = useState<State>();
  const generator = useRef<Generator<TypeOfSortState> | null>(null);

  useEffect(() => {
    setData(undefined);
    setSortWith(undefined);
    generator.current = null;
  }, [array]);

  useEffect(() => {
    const id = setInterval(() => {
      if (generator.current === null) {
        return clearInterval(id);
      }
      const { value, done } = generator.current.next();
      if (done) return clearInterval(id);
      setData(value);
    }, delay);

    return () => {
      clearInterval(id);
    };
  }, [sortWith, delay]);

  const onGenerateArrayClick = () => {
    setArray(generateRandomArray(arrayLength));
  };

  const onDelayChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDelay(Number(event.target.value));
  };

  const onArrayLengthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setArrayLength(Number(event.target.value));
  };

  const onQuickSortCLick = async () => {
    generator.current = startQuickSort([...array], 0, array.length - 1);
    setSortWith("quick");
  };

  const onBubbleSortClick = async () => {
    generator.current = startBubbleSort([...array]);
    setSortWith("bubble");
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
      </Header>
      <Columns data={{ ...data, arr: data?.arr || array }} />
    </div>
  );
}
