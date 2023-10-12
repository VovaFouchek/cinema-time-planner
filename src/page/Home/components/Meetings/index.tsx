import { useAppSelector } from '@redux/hook';
import { selectorSchedule } from '@redux/schedule/selector';

import Card from '@components/Card';
import Loader from '@components/Loader';
import DateTimeDisplay from '@components/DateTimeDisplay';

import styles from './meetings.module.scss';

const Meetings = () => {
  const { meetingsSchedule, isLoading } = useAppSelector(selectorSchedule);

  return (
    <Card title="Meetings">
      {meetingsSchedule.length ? (
        meetingsSchedule.map((meeting) => (
          <div className={styles.item} key={meeting.id}>
            <strong>{meeting.task}</strong> on{' '}
            <DateTimeDisplay date={meeting.date} />
          </div>
        ))
      ) : (
        <p>There are no meetings in the near future</p>
      )}

      {isLoading && <Loader />}
    </Card>
  );
};

export default Meetings;
