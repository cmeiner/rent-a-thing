import styles from "./AddBtn.module.scss";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from "@mui/material";

interface ButtonProps {
    onClick: () => void;
}

export const AddButton = () => (
        <AddCircleIcon className={styles.Addbtn}></AddCircleIcon>
   
);
