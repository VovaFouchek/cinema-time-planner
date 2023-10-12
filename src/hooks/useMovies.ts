import { useAppSelector } from '@redux/hook';
import { selectorSchedule } from '@redux/schedule/selector';

const useMovies = () => {
  const { moviesSchedule } = useAppSelector(selectorSchedule);

  const formattedMovies = moviesSchedule.map((movie) => ({
    value: movie.movie,
    label: movie.movie,
  }));

  const getAllMoviesTitle = () => formattedMovies;

  return {
    getAllMoviesTitle,
  };
};

export default useMovies;
