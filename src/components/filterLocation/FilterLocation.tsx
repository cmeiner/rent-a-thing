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
  const categories = [
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
        {categories.map((cat, index) => (
          <option key={index} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </div>
  );
};
