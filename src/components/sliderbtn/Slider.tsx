import styles from './Slider.module.scss';

interface SliderProps {
  onClick: () => void;
  primary: string;
  secondary: string;
  state: boolean;
  id?: string;
}

export const Slider = ({
  onClick,
  primary,
  secondary,
  state,
  id,
}: SliderProps) => {
  return (
    <div className={styles.sliderButton} id={id}>
      <button
        onClick={onClick}
        className={`${styles.button} ${!state ? styles.active : ''}`}
        disabled={!state}
      >
        {primary}
      </button>
      <button
        onClick={onClick}
        className={`${styles.button} ${state ? styles.active : ''}`}
        disabled={state}
      >
        {secondary}
      </button>
      <div
        className={`${styles.background} ${
          state ? styles.backgroundRight : styles.backgroundLeft
        }`}
      ></div>
    </div>
  );
};
