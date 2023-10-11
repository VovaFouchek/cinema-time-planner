import styles from './card.module.scss';

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
