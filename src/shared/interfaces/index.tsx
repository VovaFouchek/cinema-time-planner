interface ISession {
  date: string;
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
  task: string;
}
