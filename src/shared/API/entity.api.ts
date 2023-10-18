/* eslint-disable import/prefer-default-export */
import { axiosConfig } from './axios';

export const API = {
  MOVIES_SCHEDULE: `${axiosConfig.baseURL}/moviesSchedule`,
  MEETINGS_SCHEDULE: `${axiosConfig.baseURL}/meetingsSchedule`,
  MOVIE_SCHEDULE_BY_ID: (id: string) =>
    `${axiosConfig.baseURL}/moviesSchedule/${id}`,
};
