import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { API } from '@shared/API/entity.api';
import { IMeetingsSchedule, IMovieSchedule } from '@shared/interfaces';

import {
  MEETINGS_SCHEDULE_GET,
  MOVIES_SCHEDULE_GET,
  MOVIE_SCHEDULE_GET_BY_ID,
} from '../action-types';

export const getMoviesSchedule = createAsyncThunk(
  MOVIES_SCHEDULE_GET,
  async () => {
    try {
      const { data } = await axios.get<IMovieSchedule[]>(API.MOVIES_SCHEDULE);

      return data;
    } catch (error) {
      throw new Error('Server error...');
    }
  }
);

export const getMovieById = createAsyncThunk(
  MOVIE_SCHEDULE_GET_BY_ID,
  async (id: string) => {
    try {
      const { data } = await axios.get<IMovieSchedule>(
        API.MOVIE_SCHEDULE_BY_ID(id)
      );

      return data;
    } catch (error) {
      throw new Error('Server error...');
    }
  }
);

export const getMeetingsSchedule = createAsyncThunk(
  MEETINGS_SCHEDULE_GET,
  async () => {
    try {
      const { data } = await axios.get<IMeetingsSchedule[]>(
        API.MEETINGS_SCHEDULE
      );

      return data;
    } catch (error) {
      throw new Error('Server error...');
    }
  }
);
