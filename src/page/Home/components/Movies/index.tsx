import { useAppSelector } from '@redux/hook';
import { selectorSchedule } from '@redux/schedule/selector';

import Card from '@components/Card';
import Loader from '@components/Loader';
import DateTimeDisplay from '@components/DateTimeDisplay';

import styles from './movies.module.scss';

const Movies = () => {
  const { moviesSchedule, isLoading } = useAppSelector(selectorSchedule);

  return (
    <Card title="Movies">
      {moviesSchedule.map((movie) => (
        <div key={movie.id} className={styles.item}>
          <img
            src={movie.imageUrl}
            className={styles.picture}
            alt={movie.movie}
          />
          <strong className={styles.item__title}>{movie.movie}</strong>
          {movie.sessions.map((session) => (
            <span key={session.date}>
              <DateTimeDisplay date={session.date} />
            </span>
          ))}
        </div>
      ))}
      {isLoading && <Loader />}
    </Card>
  );
};

export default Movies;
