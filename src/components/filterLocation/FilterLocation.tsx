import styles from './FilterLocation.module.scss';

interface FilterProps {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  small?: boolean;
  id?: string;
}

export const FilterLocation = ({
  onChange,
  small = false,
  id,
}: FilterProps) => {
  const locations = [
    {
      label: 'Välj stadsdel',
    },
    {
      label: 'Nordost',
      value: 'Nordost',
    },
    {
      label: 'Centrum',
      value: 'Centrum',
    },
    {
      label: 'Sydväst',
      value: 'Sydväst',
    },
    {
      label: 'Hisingen',
      value: 'Hisingen',
    }
  ];

  return (
    <div className={styles.container}>
      <select
        required
        className={small ? styles.small : styles.large}
        onChange={onChange}
        id={id}
      >
        {locations.map((loc, index) => (
          <option key={index} value={loc.value}>
            {loc.label}
          </option>
        ))}
      </select>
    </div>
  );
};
