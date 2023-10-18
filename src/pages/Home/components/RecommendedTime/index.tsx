/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from 'react';

import { useAppSelector } from '@redux/hook';
import { selectorSchedule } from '@redux/schedule/selector';

import Card from '@components/Card';
import DateTimeDisplay from '@components/DateTimeDisplay';
import MoviesSelect, { Option } from '../MoviesSelect';

import styles from './recommendedTime.module.scss';

interface IClosestValue {
  movie: string;
  time: string;
}

const RecommendedTime = () => {
  const { moviesSchedule, meetingsSchedule } = useAppSelector(selectorSchedule);

  const [selectedOption, setSelectedOption] = useState<Option | null>();
  const [closestValue, setClosestValue] = useState<IClosestValue | null>(null);

  useEffect(() => {
    const sortedMeetings = [...meetingsSchedule].sort(
      (meetingA, meetingB) =>
        +new Date(meetingA.date) - +new Date(meetingB.date)
    );

    const selectedMovie = moviesSchedule.find(
      (movie) => movie.movie === selectedOption?.value
    );

    const convertMinuteToHours = (minuteCount: number) => minuteCount / 60;

    if (selectedMovie?.id) {
      const currentTime = new Date().getTime();

      for (const session of selectedMovie.sessions) {
        const sessionTime = new Date(session.date).getTime();
        const comuteTime = 0.5;
        const hourInMilliseconds = 60 * 60 * 1000;

        const movieRunningTime = convertMinuteToHours(
          +selectedMovie.running_time.toFixed(1)
        );

        if (sessionTime > currentTime) {
          const movieStartTime = new Date(
            sessionTime - comuteTime * hourInMilliseconds
          );
          const movieEndTime = new Date(
            sessionTime + movieRunningTime * hourInMilliseconds
          );

          const conflictingMeeting = sortedMeetings.find((meeting) => {
            const meetingTime = new Date(meeting.date);

            return meetingTime >= movieStartTime && meetingTime <= movieEndTime;
          });

          if (!conflictingMeeting) {
            setClosestValue({
              movie: selectedMovie.movie,
              time: session.date,
            });
            break;
          }
        }
      }
    }
  }, [meetingsSchedule, moviesSchedule, selectedOption?.value]);

  return (
    <Card title="The most convenient time for cinema:">
      <MoviesSelect
        value={selectedOption!}
        onChange={(value) => {
          setSelectedOption(value);
        }}
      />
      {closestValue?.movie ? (
        <div className={styles.wrap}>
          Movie: <strong>{closestValue.movie}</strong>
          <DateTimeDisplay date={closestValue.time} />
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
