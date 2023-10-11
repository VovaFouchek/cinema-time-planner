import { IMoviesSchedule } from '../../../shared/interfaces';

export interface IMoviesScheduleReducer {
  moviesSchedule: IMoviesSchedule[] | null;
  isLoading: boolean;
  error?: string | null;
}
