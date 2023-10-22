/* eslint-disable @typescript-eslint/no-floating-promises */
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '@redux/hook';
import { selectorSchedule } from '@redux/schedule/selector';
import { setOpenCreatedFormModal } from '@redux/schedule/reducer';

import Card from '@components/Card';
import Loader from '@components/Loader';
import DateTimeDisplay from '@components/DateTimeDisplay';
import Button from '@components/Button';

import { IMeetingSchedule } from '@shared/interfaces';
import { deleteMeeting } from '@redux/schedule/actions';

import styles from './meetings.module.scss';

const iconStyles = { cursor: 'pointer', color: '#212121' };

const Meetings = () => {
  const { meetingsSchedule, isLoading, error } =
    useAppSelector(selectorSchedule);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setOpenCreatedFormModal());
  };

  const handleDeleteMeeting = (id: IMeetingSchedule['id']): void => {
    if (id) {
      dispatch(deleteMeeting(id));
      if (!error) {
        toast.success('Task deleted!');
      }
    }
  };

  const sortedMeetings = [...meetingsSchedule].sort(
    (meetingA, meetingB) => +new Date(meetingA.date) - +new Date(meetingB.date)
  );

  return (
    <Card title="Meetings">
      <div className={styles.container}>
        {sortedMeetings.length ? (
          sortedMeetings.map((meeting) => (
            <div className={styles.item} key={meeting.id}>
              <div>
                <strong>{meeting.task}</strong> on{' '}
                <DateTimeDisplay date={meeting.date} />
              </div>
              <DeleteIcon
                sx={iconStyles}
                onClick={() => {
                  handleDeleteMeeting(meeting.id);
                }}
              />
            </div>
          ))
        ) : (
          <p>There are no meetings in the near future</p>
        )}
      </div>

      <Button onClick={handleClick}>Create new task</Button>

      {isLoading && <Loader />}
    </Card>
  );
};

export default Meetings;
