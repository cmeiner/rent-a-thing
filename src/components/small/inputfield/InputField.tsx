import styles from './InputField.module.scss';

interface InputProps {
  placeholder: string;
  type: string;
  value?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = ({
  placeholder,
  type,
  value,
  onChange,
  disabled,
}: InputProps) => {
  return (
    <input
      disabled={disabled}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      type={type}
      className={styles.inputField}
      required
    />
  );
};
