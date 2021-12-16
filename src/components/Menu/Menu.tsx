import Button from "../Button";
import styles from "./Menu.module.css";
import MenuItem from "./MenuItem";

type MenuProps = {
  onGenerateArrayClick: () => void;
  onSwitchSort: (sort: "quick" | "bubble") => void;
  onDelayChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onArrayLengthChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  arrayLength: number;
  delay: number;
  sortWith?: "quick" | "bubble";
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
  return (
    <div className={styles.menu}>
      <Button onClick={onGenerateArrayClick}> Generate Array </Button>

      <div className={styles.slidersContainer}>
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
          <Button onClick={() => onSwitchSort("quick")}>Quick Sort</Button>
        </MenuItem>
        <MenuItem isSelected={sortWith === "bubble"}>
          <Button onClick={() => onSwitchSort("bubble")}>Bubble Sort</Button>
        </MenuItem>
      </div>
    </div>
  );
};

export default Menu;
