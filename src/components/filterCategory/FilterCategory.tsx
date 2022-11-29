import styles from './FilterCategory.module.scss';

interface FilterProps {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  small?: boolean;
}

export const FilterCategory = ({ onChange, small = false }: FilterProps) => {
  const categories = [
    {
      label: 'Välj kategori',
      value: 'Övrigt',
    },
    {
      label: 'Fordon',
      value: 'Fordon',
    },
    {
      label: 'Outdoor',
      value: 'Outdoor',
    },
    {
      label: 'Verktyg',
      value: 'Verktyg',
    },
    {
      label: 'Träning',
      value: 'Träning',
    },
    {
      label: 'Elektronik',
      value: 'Elektronik',
    },
    {
      label: 'Övrigt',
      value: 'Övrigt',
    },
  ];

  return (
    <div className={styles.container}>
      <select
        className={small ? styles.small : styles.large}
        onChange={onChange}
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
