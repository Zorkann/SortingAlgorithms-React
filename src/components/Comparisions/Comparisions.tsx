import styles from "./Comparisions.module.css";

type ComparisionsProps = {
  sortWith?: "bubble" | "quick";
  comparisions?: number;
};

const Comparisions = ({ sortWith, comparisions = 0 }: ComparisionsProps) => {
  const sortedBy = sortWith ? `${sortWith} Sort` : null;
  return (
    <div className={styles.comparisions}>
      <span>Sorted By: {sortedBy}</span>
      <span>Comparisions: {comparisions}</span>
    </div>
  );
};

export default Comparisions;
