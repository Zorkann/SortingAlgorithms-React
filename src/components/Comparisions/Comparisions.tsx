import styles from "./Comparisions.module.css";
import ThemeToggler from "../../ThemeToggler";

type ComparisionsProps = {
  sortWith?: "bubble" | "quick";
  comparisions?: number;
};

const Comparisions = ({ sortWith, comparisions = 0 }: ComparisionsProps) => {
  const sortedBy = sortWith ? `${sortWith} Sort` : null;
  return (
    <div className={styles.comparisions}>
      <ThemeToggler />
      <span>Sorted By: {sortedBy}</span>
      <span>Comparisions: {comparisions}</span>
    </div>
  );
};

export default Comparisions;
