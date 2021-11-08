import Button from "../Button";
import styles from "./Menu.module.css";
import MenuItem from "./MenuItem";

type MenuProps = {
  onGenerateArrayClick: () => void;
  onQuickSortCLick: () => void;
  onBubbleSortClick: () => void;
  onDelayChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  delay: number;
  sortWith?: "quick" | "bubble";
};

const Menu = ({
  onGenerateArrayClick,
  onQuickSortCLick,
  onDelayChange,
  onBubbleSortClick,
  delay,
  sortWith
}: MenuProps) => {
  return (
    <div className={styles.menu}>
      <Button onClick={onGenerateArrayClick}> Generate Array </Button>

      <div className={styles.delay}>
        <label htmlFor="delay">Delay: {delay}</label>
        <input
          type="range"
          min="1"
          max="200"
          value={delay}
          onChange={onDelayChange}
          id="delay"
        />
      </div>

      <MenuItem isSelected={sortWith === "quick"}>
        <Button onClick={onQuickSortCLick}>Quick Sort</Button>
      </MenuItem>
      <MenuItem isSelected={sortWith === "bubble"}>
        <Button onClick={onBubbleSortClick}>Bubble Sort</Button>
      </MenuItem>
    </div>
  );
};

export default Menu;
