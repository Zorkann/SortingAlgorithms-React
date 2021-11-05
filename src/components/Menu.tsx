type MenuProps = {
  onGenerateArrayClick: () => void;
  onQuickSortCLick: () => void;
  onBubbleSortClick: () => void;
  onDelayChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  delay: number;
};

const Menu = ({
  onGenerateArrayClick,
  onQuickSortCLick,
  onDelayChange,
  onBubbleSortClick,
  delay
}: MenuProps) => {
  return (
    <div>
      <button onClick={onGenerateArrayClick}> Generate Array </button>
      <label htmlFor="delay">Delay:</label>
      <input
        id="delay"
        placeholder="Time in ms"
        type="number"
        onChange={onDelayChange}
        value={delay}
      />
      <button onClick={onQuickSortCLick}> Quick Sort </button>
      <button onClick={onBubbleSortClick}> Bubble Sort </button>
    </div>
  );
};

export default Menu;
