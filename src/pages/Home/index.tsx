/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect } from 'react';

import { Toaster } from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '@redux/hook';
import { selectorSchedule } from '@redux/schedule/selector';
import {
  getMeetingsSchedule,
  getMoviesSchedule,
} from '@redux/schedule/actions';

import ErrorMessage from '@components/ErrorMessage';
import Meetings from './components/Meetings';
import Movies from './components/Movies';
import RecommendedTime from './components/RecommendedTime';
import CreateFormModal from './components/CreateFormModal';
import ICSUploader from './components/ICSUploader';

import styles from './home.module.scss';

const Home = () => {
  const dispatch = useAppDispatch();

  const { isLoading, error } = useAppSelector(selectorSchedule);

  useEffect(() => {
    dispatch(getMoviesSchedule());
    dispatch(getMeetingsSchedule());
  }, [dispatch]);

  return (
    <div className={styles.inner}>
      <h1>Cinema time planner</h1>

      <div className={styles.wrap}>
        <Meetings />
        <Movies />
        <RecommendedTime />
      </div>
      <div className={styles.wrap__uploader}>
        <p className={styles.text}>
          Would you like to download your schedule? (.ics file)
        </p>
        <ICSUploader />
      </div>

      <CreateFormModal />
      <Toaster />

      {!isLoading && error ? <ErrorMessage message={error} /> : null}
    </div>
  );
};

export default Home;
