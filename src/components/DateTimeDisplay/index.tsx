interface DateTimeDisplayProps {
  date: string;
}

const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({ date }) => {
  const formattedDate = new Date(date).toLocaleString('en-US', {
    weekday: 'short',
    month: 'numeric',
    day: 'numeric',
  });

  const formattedTime = new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <div>
      {formattedDate} at {formattedTime}
    </div>
  );
};

export default DateTimeDisplay;
