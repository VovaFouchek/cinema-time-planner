interface ISession {
  date: string;
  time: string;
}

export interface IMoviesSchedule {
  id: number;
  movie: string;
  sessions: ISession[];
}
