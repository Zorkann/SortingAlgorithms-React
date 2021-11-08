import { MouseEvent, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
};

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
