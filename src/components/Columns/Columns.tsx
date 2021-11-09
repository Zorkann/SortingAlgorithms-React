import { v4 as uuidv4 } from "uuid";
import styles from "./Columns.module.css";
import classNames from "classnames";

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
    <div className={styles.columnsContainer}>
      {arr.map((element, index) => (
        <div
          className={classNames({
            [styles.column]: true,
            [styles.pivot]: index === pi,
            [styles.i]: index === i,
            [styles.j]: index === j
          })}
          style={{ height: `calc(${((element + 4) * 95) / maxValue}%)` }}
          key={uuidv4()}
        >
          {element}
        </div>
      ))}
    </div>
  );
};

export default Columns;
