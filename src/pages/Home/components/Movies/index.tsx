import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@redux/hook';
import { selectorSchedule } from '@redux/schedule/selector';

import Card from '@components/Card';
import Loader from '@components/Loader';
import Button from '@components/Button';

import ROUTERS from '@shared/constants/routers';

import styles from './movies.module.scss';

const Movies = () => {
  const { moviesSchedule, isLoading } = useAppSelector(selectorSchedule);

  const navigate = useNavigate();

  return (
    <Card title="Movies">
      {moviesSchedule.map((movie) => (
        <div key={movie.id} className={styles.item}>
          <Link to={`${ROUTERS.BASE}/${movie.id}`}>
            <img
              src={movie.imageUrl}
              className={styles.picture}
              alt={movie.movie}
            />
          </Link>
          <strong className={styles.item__title}>{movie.movie}</strong>
          <Button
            onClick={() => {
              navigate(`${ROUTERS.BASE}/${movie.id}`);
            }}
          >
            Details
          </Button>
        </div>
      ))}

      {isLoading && <Loader />}
    </Card>
  );
};

export default Movies;
