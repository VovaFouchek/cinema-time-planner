import { useAppSelector } from '@redux/hook';
import { selectorSchedule } from '@redux/schedule/selector';

import Card from '@components/Card';
import Loader from '@components/Loader';

// import styles from './movies.module.scss';

const Movies = () => {
  const { moviesSchedule, isLoading } = useAppSelector(selectorSchedule);

  return (
    <Card>
      <h2>Movies</h2>
      {moviesSchedule?.map((data) => <div key={data.id}>{data.movie}</div>)}
      {isLoading && <Loader />}
    </Card>
  );
};

export default Movies;
