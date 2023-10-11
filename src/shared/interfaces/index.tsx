interface ISession {
  date: string;
  time: string;
}

export interface IMoviesSchedule {
  id: number;
  movie: string;
  picture?: string;
  sessions: ISession[];
}

export interface IMeetingsSchedule {
  id: number;
  date: string;
  time: string;
  task: string;
}
