import { ReactNode } from "react";
import styles from "./Header.module.css";

type HeaderProps = {
  children: ReactNode;
};

const Header = ({ children }: HeaderProps) => (
  <div className={styles.header}>{children}</div>
);

export default Header;
