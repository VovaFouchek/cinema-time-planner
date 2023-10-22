interface ISession {
  date: string;
}

type TGenre =
  | 'Biography'
  | 'Drama'
  | 'History'
  | 'Action'
  | 'Adventure'
  | 'Sci-Fi'
  | 'Mystery';

export interface IMovieSchedule {
  id: number;
  movie: string;
  imageUrl: string;
  description: string;
  production: string;
  release_date: string;
  genre: TGenre[];
  running_time: number;
  age_restriction: string;
  director: string;
  starring: string[];
  sessions: ISession[];
}

export interface IcsToJsonData {
  startDate: string;
  endDate: string;
  description?: string;
  summary: string;
  location?: string;
}

export interface IMeetingSchedule {
  id?: number;
  date: string;
  task: string;
}

export type IcsData = IcsToJsonData & IMeetingSchedule;
