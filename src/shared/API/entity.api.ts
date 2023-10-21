/* eslint-disable import/prefer-default-export */
import { axiosConfig } from './axios';

export const API = {
  MOVIES_SCHEDULE: `${axiosConfig.baseURL}/moviesSchedule`,
  MEETINGS_SCHEDULE: `${axiosConfig.baseURL}/meetingsSchedule`,
  MEETINGS_SCHEDULE_WITH_ID: (id: number) =>
    `${axiosConfig.baseURL}/meetingsSchedule/${id}`,
  MOVIE_SCHEDULE_BY_ID: (id: number) =>
    `${axiosConfig.baseURL}/moviesSchedule/${id}`,
};
