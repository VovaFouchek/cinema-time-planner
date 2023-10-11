import { RootState } from '../store';

// eslint-disable-next-line import/prefer-default-export
export const selectorMoviesSchedule = (state: RootState) =>
  state.moviesSchedule;
