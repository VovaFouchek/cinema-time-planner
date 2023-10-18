import { IMeetingsSchedule, IMovieSchedule } from '@shared/interfaces';

export interface IScheduleReducer {
  moviesSchedule: IMovieSchedule[];
  meetingsSchedule: IMeetingsSchedule[];
  movieDetails: IMovieSchedule;
  isLoading: boolean;
  error?: string | null;
}
