import styles from "./Columns.module.css";
import classNames from "classnames";
import { Reorder } from "framer-motion";

type ColumnProps = {
  data: {
    p?: number;
    pi?: number;
    i?: number;
    j?: number;
    arr: number[];
  };
};

const Columns = ({ data }: ColumnProps) => {
  const { pi, i, j, arr } = data;
  const maxValue = Math.max(...arr);

  return (
    <Reorder.Group
      className={styles.columnsContainer}
      axis="x"
      values={data.arr}
      onReorder={() => null}
    >
      {arr.map((element, index) => (
        <Reorder.Item
          as="div"
          dragListener={false}
          className={classNames({
            [styles.column]: true,
            [styles.pivot]: index === pi,
            [styles.i]: index === i,
            [styles.j]: index === j
          })}
          key={element}
          style={{ height: `calc(${((element + 4) * 95) / maxValue}%)` }}
          value={element}
        >
          <div>{element}</div>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default Columns;
