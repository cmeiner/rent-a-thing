import styles from './PrimaryBtn.module.scss';

interface ButtonProps {
  text: string;
  submit: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export const PrimaryButton = ({
  text,
  onClick,
  submit = false,
  disabled = false,
}: ButtonProps) => (
  <button
    onClick={onClick}
    type={`${submit ? 'submit' : 'button'}`}
    className={disabled ? styles.primbtnDisabled : styles.primbtn}
    disabled={disabled}
  >
    {text}
  </button>
);
