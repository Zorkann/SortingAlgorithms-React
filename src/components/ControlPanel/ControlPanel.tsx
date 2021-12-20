import styles from "./ControlPanel.module.css";

type ControlPanelProps = {
  children: React.ReactNode;
};

const ControlPanel = ({ children }: ControlPanelProps) => {
  return <div className={styles.controlPanel}>{children}</div>;
};

export default ControlPanel;
