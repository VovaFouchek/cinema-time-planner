/* eslint-disable import/prefer-default-export */
import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { MOVIES_SCHEDULE_GET } from '../action-types';

import { API } from '@/shared/API/entity.api';
import { IMoviesSchedule } from '../../shared/interfaces';

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
