import AddCircleIcon from '@mui/icons-material/AddCircle';
import styles from './AddBtn.module.scss';

interface ButtonProps {
  large?: boolean;
  id?: string;
}

export const AddButton = ({ large = false, id }: ButtonProps) => (
  <AddCircleIcon
    className={large ? styles.AddbtnLarge : styles.Addbtn}
    id={id}
  ></AddCircleIcon>
);
