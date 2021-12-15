import styles from "./ControlPanel.module.css";
import Button from "../Button";

type ControlPanelProps = {
  onStopClick: () => void;
  onPauseClick: () => void;
  onPlayClick: () => void;
  onNextClick: () => void;
};

const ControlPanel = ({
  onPauseClick,
  onStopClick,
  onPlayClick,
  onNextClick
}: ControlPanelProps) => {
  return (
    <div className={styles.controlPanel}>
      <Button onClick={onStopClick}>Stop</Button>
      <Button onClick={onPlayClick}>Play</Button>
      <Button onClick={onPauseClick}>Pause</Button>
      <Button onClick={onNextClick}>{">"}</Button>
    </div>
  );
};

export default ControlPanel;
