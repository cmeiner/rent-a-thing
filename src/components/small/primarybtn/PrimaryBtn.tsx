import styles from "./PrimaryBtn.module.scss";

interface ButtonProps {
    text: string;
    submit: boolean;
    onClick?: () => void;
}

export const PrimaryButton = ({text, onClick, submit= false}: ButtonProps) => (
  <button onClick={onClick} type={`${submit ? "submit": "button"}`} className={styles.primbtn}>{text}</button>
);
