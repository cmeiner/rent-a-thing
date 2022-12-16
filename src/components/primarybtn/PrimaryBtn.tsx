import styles from './PrimaryBtn.module.scss';

interface ButtonProps {
  text: string;
  submit?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  id?: string;
}

export const PrimaryButton = ({
  text,
  onClick,
  submit,
  disabled,
  id,
}: ButtonProps) => (
  <button
    onClick={onClick}
    type={`${submit ? 'submit' : 'button'}`}
    className={disabled ? styles.primbtnDisabled : styles.primbtn}
    disabled={disabled}
    id={id}
  >
    {text}
  </button>
);
