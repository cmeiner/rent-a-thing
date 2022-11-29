import styles from './AddBtn.module.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface ButtonProps {
  large?: boolean;
}

export const AddButton = ({ large = false }: ButtonProps) => (
  <AddCircleIcon
    className={large ? styles.AddbtnLarge : styles.Addbtn}
  ></AddCircleIcon>
);
