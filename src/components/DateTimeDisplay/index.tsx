import moment from 'moment';

interface DateTimeDisplayProps {
  date: string;
}

const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({ date }) => {
  const formattedDateTime = moment(date).format('ddd, MMM Do, h:mm a');

  return <div>{formattedDateTime}</div>;
};

export default DateTimeDisplay;
