import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useRef } from 'react';
import styles from './FilesInput.module.scss';

interface InputProps {
  type: string;
  onChange?: (e: any) => void;
  disabled?: boolean;
  id?: string;
}

export const FilesInput = ({ type, onChange, disabled, id }: InputProps) => {
  const inputElement = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inputElement.current) {
      inputElement.current.click();
    }
  };
  return (
    <div className={styles.filesInputContainer} onClick={focusInput}>
      <label htmlFor="files" className={styles.label}>
        Ladda upp bild:
        <input
          ref={inputElement}
          onChange={onChange}
          disabled={disabled}
          type={type}
          required
          className={styles.filesInput}
          id={id}
        />
      </label>
      <FileUploadIcon />
    </div>
  );
};
