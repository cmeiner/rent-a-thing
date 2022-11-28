import styles from './InputField.module.scss';

interface InputProps {
  placeholder: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = ({
  placeholder,
  type,
  value,
  onChange,
}: InputProps) => {
  return (
    <input
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      type={type}
      className={styles.inputField}
    />
  );
};
