import { useAppSelector } from '@redux/movies/hook';
import { selectorMoviesSchedule } from '@redux/movies/selector';

import Card from '@components/Card';
import Loader from '@components/Loader';

// import styles from './movies.module.scss';

const Movies = () => {
  const { moviesSchedule, isLoading } = useAppSelector(selectorMoviesSchedule);

  return (
    <Card>
      <h2>Movies</h2>
      {moviesSchedule?.map((data) => <div key={data.id}>{data.movie}</div>)}
      {isLoading && <Loader />}
    </Card>
  );
};

export default Movies;
