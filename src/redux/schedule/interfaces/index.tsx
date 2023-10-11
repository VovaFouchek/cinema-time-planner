import { IMeetingsSchedule, IMoviesSchedule } from '../../../shared/interfaces';

export interface IScheduleReducer {
  moviesSchedule: IMoviesSchedule[];
  meetingsSchedule: IMeetingsSchedule[];
  isLoading: boolean;
  error?: string | null;
}
