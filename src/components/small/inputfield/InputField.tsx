import styles from './InputField.module.scss';

interface InputProps {
  placeholder: string;
  type: string;
}

export const InputField = ({ placeholder, type }: InputProps) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      className={styles.inputField}
      />
  );
};
