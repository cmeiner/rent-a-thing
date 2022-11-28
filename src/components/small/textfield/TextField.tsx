import styles from './TextField.module.scss';

interface InputProps {
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
}

export const TextField = ({ placeholder, onChange, value }: InputProps) => {
  return (
    <div className={styles.textField}>
      <textarea
        onChange={onChange}
        value={value}
        className={styles.textFieldContent}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};
