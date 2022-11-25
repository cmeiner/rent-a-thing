import styles from "./Slider.module.scss";

/**
 * @param {string} primary - sets title for left button.
 * @param {string} secondary - sets title for right button.
 * @param onClick - passes onClick
 * @param {boolean} state - passes state to declare selected button. "false" is default
 */
interface sliderProps {
  onClick: () => void;
  primary: string;
  secondary: string;
  state: boolean;
}

export const Slider = ({ onClick, primary, secondary, state }: sliderProps) => {
  return (
    <div className={styles.sliderButton}>
      <button
        onClick={onClick}
        className={`${styles.button} ${!state ? styles.active : ""}`}
        disabled={!state}
      >
        {primary}
      </button>
      <button
        onClick={onClick}
        className={`${styles.button} ${state ? styles.active : ""}`}
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
