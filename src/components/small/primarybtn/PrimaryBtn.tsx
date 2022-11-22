import styles from "./PrimaryBtn.module.scss";

interface ButtonProps {
    text: string;
    onClick: () => void;
}

export const PrimaryButton = ({text, onClick}: ButtonProps) => (
  <button onClick={onClick} className={styles.primbtn}>{text}</button>
);
