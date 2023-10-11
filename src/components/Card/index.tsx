import styles from './card.module.scss';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Card;
