import styles from './button.module.scss';

interface ButtonProps {
  children: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button type="button" onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
