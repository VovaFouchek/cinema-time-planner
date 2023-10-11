import { IMeetingsSchedule, IMoviesSchedule } from '../../../shared/interfaces';

export interface IScheduleReducer {
  moviesSchedule: IMoviesSchedule[] | null;
  meetingsSchedule: IMeetingsSchedule[] | null;
  isLoading: boolean;
  error?: string | null;
}
