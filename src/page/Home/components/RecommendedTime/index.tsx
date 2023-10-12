/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useAppSelector } from '@redux/hook';
import { selectorSchedule } from '@redux/schedule/selector';

import Card from '@components/Card';
import DateTimeDisplay from '@components/DateTimeDisplay';

import styles from './recommendedTime.module.scss';

const RecommendedTime = () => {
  const { moviesSchedule, meetingsSchedule } = useAppSelector(selectorSchedule);

  const currentTime = new Date();
  let closestMovie = '';
  let closestTime = '';

  const sortedMeetings = [...meetingsSchedule].sort(
    (a, b) => +new Date(a.date) - +new Date(b.date)
  );

  for (const movie of moviesSchedule) {
    for (const session of movie.sessions) {
      if (session?.date) {
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
            closestMovie = movie.movie;
            closestTime = session.date;
            break;
          }
        }
      }
    }
  }

  return (
    <Card title="The most convenient time for cinema:">
      {closestMovie ? (
        <div className={styles.wrap}>
          Movie: <strong>{closestMovie}</strong>
          <DateTimeDisplay date={closestTime} />
          <p className={styles.description}>Have a great time!</p>
        </div>
      ) : (
        <p>Unfortunately, no suitable time was found to visit the cinema</p>
      )}
    </Card>
  );
};

export default RecommendedTime;
