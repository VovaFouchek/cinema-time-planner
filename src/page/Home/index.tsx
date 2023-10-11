/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@redux/movies/hook';
import { getMoviesSchedule } from '@redux/movies/actions';
import { selectorMoviesSchedule } from '@redux/movies/selector';

import ErrorMessage from '@components/ErrorMessage';
import Meetings from './components/Meetings';
import Movies from './components/Movies';

import styles from './home.module.scss';

const Home = () => {
  const dispatch = useAppDispatch();

  const { isLoading, error } = useAppSelector(selectorMoviesSchedule);

  useEffect(() => {
    dispatch(getMoviesSchedule());
  }, [dispatch]);

  return (
    <div className={styles.inner}>
      <h1>Cinema time planner</h1>

      <div className={styles.wrap}>
        <Meetings />
        <Movies />
      </div>

      {!isLoading && error ? <ErrorMessage message={error} /> : null}
    </div>
  );
};

export default Home;
