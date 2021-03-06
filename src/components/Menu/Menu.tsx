import Button from "../Button";
import styles from "./Menu.module.css";
import MenuItem from "./MenuItem";
import { ChangeEvent } from "react";
import { SortType } from "../../useSortState/useSortState";

type MenuProps = {
  onGenerateArrayClick: () => void;
  onSwitchSort: (sort: SortType) => void;
  onDelayChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onArrayLengthChange: (event: ChangeEvent<HTMLInputElement>) => void;
  arrayLength: number;
  delay: number;
  sortWith?: SortType;
};

const Menu = ({
  onGenerateArrayClick,
  onSwitchSort,
  onDelayChange,
  onArrayLengthChange,
  arrayLength,
  delay,
  sortWith
}: MenuProps) => {
  const onQuickSortClick = () => {
    onSwitchSort("quick");
  };

  const onBubbleSortClick = () => {
    onSwitchSort("bubble");
  };

  return (
    <div className={styles.menu}>
      <Button onClick={onGenerateArrayClick}> Generate Array </Button>
      <div className={styles.sliders}>
        <div className={styles.slider}>
          <div className={styles.sliderLabels}>
            <label htmlFor="delay">Slow</label>
            <label htmlFor="delay">Fast</label>
          </div>
          <input
            type="range"
            min="-500"
            max="-50"
            value={-Math.abs(delay)}
            onChange={onDelayChange}
            id="delay"
          />
        </div>

        <div className={styles.slider}>
          <label htmlFor="length">Array Length: {arrayLength}</label>
          <input
            type="range"
            min="3"
            max="30"
            value={arrayLength}
            onChange={onArrayLengthChange}
            id="length"
          />
        </div>
      </div>

      <div className={styles.sort}>
        <MenuItem isSelected={sortWith === "quick"}>
          <Button onClick={onQuickSortClick}>Quick Sort</Button>
        </MenuItem>

        <MenuItem isSelected={sortWith === "bubble"}>
          <Button onClick={onBubbleSortClick}>Bubble Sort</Button>
        </MenuItem>
      </div>
    </div>
  );
};

export default Menu;
