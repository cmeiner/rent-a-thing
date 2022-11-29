import TuneIcon from '@mui/icons-material/Tune';
import styles from './FilterCategory.module.scss';

export const FilterCategory = () => {
  return (
    <div className={styles.container}>
      <select name="Filter" id="Filter" className={styles.filter}>
        <option value="Fordon">Fordon</option>
        <option value="Outdoor">Outdoor</option>
        <option value="Verktyg">Verktyg</option>
        <option value="Träning">Träning</option>
        <option value="Elektronik">Elektronik</option>
        <option value="Övrigt">Övrigt</option>
      </select>
    </div>
  );
};
