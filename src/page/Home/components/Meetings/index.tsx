import { useAppSelector } from '@redux/hook';
import { selectorSchedule } from '@redux/schedule/selector';

import Card from '@components/Card';
import Loader from '@components/Loader';

// import styles from './meetings.module.scss';

const Meetings = () => {
  const { meetingsSchedule, isLoading } = useAppSelector(selectorSchedule);
  return (
    <Card>
      <h2>Meetings</h2>
      {meetingsSchedule?.map((data) => <div key={data.id}>{data.task}</div>)}
      {isLoading && <Loader />}
    </Card>
  );
};

export default Meetings;
