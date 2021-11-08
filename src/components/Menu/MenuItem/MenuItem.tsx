import { ReactNode } from "react";
import styles from "./MenuItem.module.css";
import classNames from "classnames";

type MenuItemProps = {
  children: ReactNode;
  isSelected: boolean;
};

const MenuItem = ({ isSelected, children }: MenuItemProps) => {
  return (
    <div
      className={classNames({
        [styles.selected]: isSelected
      })}
    >
      {children}
    </div>
  );
};

export default MenuItem;
