import styles from "./TextField.module.scss";

interface InputProps {
  placeholder: string;
}

export const TextField = ({ placeholder }: InputProps) => {
  return (
    <div className={styles.textField}>
      <textarea
        className={styles.textFieldContent}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};
