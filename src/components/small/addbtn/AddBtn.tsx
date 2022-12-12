import styles from './AddBtn.module.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface ButtonProps {
  large?: boolean;
  id?: string;
}

export const AddButton = ({ large, id }: ButtonProps) => (
  <AddCircleIcon
    className={large ? styles.AddbtnLarge : styles.Addbtn}
    id={id}
  ></AddCircleIcon>
);
