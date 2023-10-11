import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { MEETINGS_SCHEDULE_GET, MOVIES_SCHEDULE_GET } from '../action-types';

import { IMeetingsSchedule, IMoviesSchedule } from '../../shared/interfaces';
import { API } from '@/shared/API/entity.api';

export const getMoviesSchedule = createAsyncThunk(
  MOVIES_SCHEDULE_GET,
  async () => {
    try {
      const { data } = await axios.get<IMoviesSchedule[]>(API.MOVIES_SCHEDULE);

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
