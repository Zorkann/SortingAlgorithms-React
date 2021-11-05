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
      <input
        type="range"
        min="1"
        max="200"
        value={delay}
        onChange={onDelayChange}
        id="delay"
      />
      <label htmlFor="delay">Delay: {delay}</label>
      <button onClick={onQuickSortCLick}> Quick Sort </button>
      <button onClick={onBubbleSortClick}> Bubble Sort </button>
    </div>
  );
};

export default Menu;
