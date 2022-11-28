import TuneIcon from "@mui/icons-material/Tune";
import styles from "./FilterAndText.module.scss";

interface FilterProps {
  onClick: () => void;
}

export const FilterAndText = ({ onClick }: FilterProps) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <TuneIcon /> <p>Filtrera</p>
    </div>
  );
};
