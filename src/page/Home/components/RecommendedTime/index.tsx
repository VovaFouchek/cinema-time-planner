/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useAppSelector } from '@redux/hook';
import { selectorSchedule } from '@redux/schedule/selector';

import Card from '@components/Card';

const RecommendedTime = () => {
  const { moviesSchedule, meetingsSchedule } = useAppSelector(selectorSchedule);

  const calculateRecommendedTime = () => {
    const sortedMeetings = [...meetingsSchedule].sort(
      (a, b) => +new Date(a.date) - +new Date(b.date)
    );

    const firstMeeting = sortedMeetings[0];
    const nearestMovie = [...moviesSchedule].find((movie) => {
      if (firstMeeting?.date) {
        return new Date(movie.sessions[0]?.date) > new Date(firstMeeting.date);
      }
      return -1;
    });

    if (!nearestMovie) {
      return 'На жаль, не знайдено підходящого часу для відвідування кінотеатру.';
    }

    return `Фільм: ${nearestMovie.movie}, Дата та час: "${nearestMovie.sessions[0].date}".`;
  };

  const recommendedTime = calculateRecommendedTime();

  return (
    <Card title="The most convinient time for cinema:">
      <p>{recommendedTime}</p>
    </Card>
  );
};

export default RecommendedTime;
