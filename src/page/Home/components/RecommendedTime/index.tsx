/* eslint-disable no-restricted-syntax */
import { useState } from 'react';

import { useAppSelector } from '@redux/hook';
import { selectorSchedule } from '@redux/schedule/selector';

import Card from '@components/Card';
import DateTimeDisplay from '@components/DateTimeDisplay';
import MoviesSelect, { Option } from '../MoviesSelect';

import styles from './recommendedTime.module.scss';

const RecommendedTime = () => {
  const { moviesSchedule, meetingsSchedule } = useAppSelector(selectorSchedule);

  const [selectedOption, setSelectedOption] = useState<Option | null>();

  let closestMovie = '';
  let closestTime = '';

  const sortedMeetings = [...meetingsSchedule].sort(
    (meetingA, meetingB) => +new Date(meetingA.date) - +new Date(meetingB.date)
  );

  const selectedMovie = moviesSchedule.find(
    (movie) => movie.movie === selectedOption?.value
  );

  if (selectedMovie?.id) {
    const currentTime = new Date();

    for (const session of selectedMovie.sessions) {
      const sessionTime = new Date(session.date);

      if (sessionTime > currentTime) {
        const movieStartTime = new Date(
          sessionTime.getTime() - 1 * 60 * 60 * 1000
        );
        const movieEndTime = new Date(
          sessionTime.getTime() + 2 * 60 * 60 * 1000
        );

        const conflictingMeeting = sortedMeetings.find((meeting) => {
          const meetingTime = new Date(meeting.date);

          return meetingTime >= movieStartTime && meetingTime <= movieEndTime;
        });

        if (!conflictingMeeting) {
          closestMovie = selectedMovie.movie;
          closestTime = session.date;
          break;
        }
      }
    }
  }
  return (
    <Card title="The most convenient time for cinema:">
      <MoviesSelect
        value={selectedOption!}
        onChange={(value) => {
          setSelectedOption(value);
        }}
      />
      {closestMovie ? (
        <div className={styles.wrap}>
          Movie: <strong>{closestMovie}</strong>
          <DateTimeDisplay date={closestTime} />
          <p className={styles.description}>
            You will spend almost 2 hours on a movie and 1 hours to commute.
            Have a great time!
          </p>
        </div>
      ) : (
        <p className={styles.text}>
          Unfortunately, no suitable time was found to visit the cinema
        </p>
      )}
    </Card>
  );
};

export default RecommendedTime;
