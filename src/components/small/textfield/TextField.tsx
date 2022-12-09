import styles from './TextField.module.scss';

interface InputProps {
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  id?: string;
}

export const TextField = ({ placeholder, onChange, value, id }: InputProps) => {
  return (
    <div className={styles.textField}>
      <textarea
        onChange={onChange}
        value={value}
        className={styles.textFieldContent}
        placeholder={placeholder}
        id={id}
        required
      ></textarea>
    </div>
  );
};
