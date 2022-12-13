import FileUploadIcon from '@mui/icons-material/FileUpload';
import styles from './FilesInput.module.scss';

interface InputProps {
  type: string;
  onChange?: (e: any) => void;
  disabled?: boolean;
  id?: string;
}

export const FilesInput = ({ type, onChange, disabled, id }: InputProps) => {
  return (
    <div className={styles.filesInputContainer}>
      <label htmlFor="files" className={styles.label} placeholder="hej">
        Ladda upp bild:
        <input
          disabled={disabled}
          onChange={onChange}
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
