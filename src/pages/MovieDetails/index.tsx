/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@redux/hook';
import { selectorSchedule } from '@redux/schedule/selector';
import { getMovieById } from '@redux/schedule/actions';

import DateTimeDisplay from '@components/DateTimeDisplay';
import Button from '@components/Button';
import Loader from '@components/Loader';
import ErrorMessage from '@components/ErrorMessage';

import ROUTERS from '@shared/constants/routers';

import styles from './movieDetails.module.scss';

const MovieDetails = () => {
  const { movieDetails, isLoading, error } = useAppSelector(selectorSchedule);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const handleBackClick = () => {
    navigate(ROUTERS.BASE);
  };

  useEffect(() => {
    if (id) {
      dispatch(getMovieById(+id));
    }
  }, [dispatch, id]);

  const getReleaseYear = new Date(movieDetails.release_date).getFullYear();

  return (
    <>
      <Button onClick={handleBackClick}>Back to Home</Button>
      {isLoading ? (
        <Loader />
      ) : (
        movieDetails.id && (
          <div className={styles.inner}>
            <img
              src={movieDetails.imageUrl}
              className={styles.picture}
              alt={movieDetails.movie}
            />
            <div className={styles.wrap__content}>
              <h3 className={styles.title}>{movieDetails.movie}</h3>
              <p className={styles.description}>{movieDetails.description}</p>
              <ul>
                <li>
                  <strong>Production:</strong> {movieDetails.production}
                </li>
                <li>
                  <strong>Genre:</strong> {movieDetails.genre.join(', ')}
                </li>
                <li>
                  <strong>Release year:</strong> {getReleaseYear}
                </li>
                <li>
                  <strong>Director:</strong> {movieDetails.director}
                </li>
                <li>
                  <strong>Running time:</strong> {movieDetails.running_time}
                  <span>min</span>
                </li>
                <li>
                  <strong>Age restriction: </strong>
                  {movieDetails.age_restriction}
                </li>
                <li>
                  <strong>Starring:</strong> {movieDetails.starring.join(', ')}
                </li>
                <li>
                  <strong>Available sessions:</strong>
                </li>
              </ul>
              <div className={styles.wrap__session}>
                {movieDetails.sessions.length ? (
                  movieDetails.sessions.map((session) => (
                    <div key={session.date} className={styles.session}>
                      <DateTimeDisplay date={session.date} />
                    </div>
                  ))
                ) : (
                  <p>No available sessions</p>
                )}
              </div>
            </div>
          </div>
        )
      )}

      {!isLoading && error ? <ErrorMessage message={error} /> : null}
    </>
  );
};

export default MovieDetails;
