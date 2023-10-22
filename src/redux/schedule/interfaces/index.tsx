import { IMeetingSchedule, IMovieSchedule, IcsData } from '@shared/interfaces';

export interface IScheduleReducer {
  isOpenCreatedFormModal: boolean;
  icsData: IcsData[] | null;
  moviesSchedule: IMovieSchedule[];
  meetingsSchedule: IMeetingSchedule[];
  movieDetails: IMovieSchedule;
  isLoading: boolean;
  error?: string | null;
}
