import styles from './FilterDay.module.scss';

interface FilterDayProps {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const FilterDay = ({ onChange }: FilterDayProps) => {
  const days = [
    {
      label: 'Välj dagar',
    },
    {
      label: '1 dag',
      value: '1',
    },
    {
      label: '2 dagar',
      value: '2',
    },
    {
      label: '3 dagar',
      value: '3',
    },
    {
      label: '4 dagar',
      value: '4',
    },
    {
      label: '5 dagar',
      value: '5',
    },
    {
      label: '6 dagar',
      value: '6',
    },
    {
      label: '7 dagar',
      value: '7',
    },
  ];

  return (
    <div className={styles.container}>
      <select required className={styles.filter} onChange={onChange}>
        {days.map((day, index) => (
          <option key={index} value={day.value}> 
            {day.label}
          </option>
        ))}
      </select>
    </div>
  );
};
