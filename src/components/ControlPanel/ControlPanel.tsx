import styles from "./ControlPanel.module.css";
import Button from "../Button";

type ControlPanelProps = {
  onStopClick: () => void;
  onPauseClick: () => void;
  onPlayClick: () => void;
  onNextClick: () => void;
  onPrevClick: () => void;
};

const ControlPanel = ({
  onPauseClick,
  onStopClick,
  onPlayClick,
  onNextClick,
  onPrevClick
}: ControlPanelProps) => {
  return (
    <div className={styles.controlPanel}>
      <Button onClick={onPrevClick}>{"<"}</Button>
      <Button onClick={onStopClick}>Stop</Button>
      <Button onClick={onPlayClick}>Play</Button>
      <Button onClick={onPauseClick}>Pause</Button>
      <Button onClick={onNextClick}>{">"}</Button>
    </div>
  );
};

export default ControlPanel;
