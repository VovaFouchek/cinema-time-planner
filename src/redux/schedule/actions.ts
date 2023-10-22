import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { API } from '@shared/API/entity.api';
import { IMeetingSchedule, IMovieSchedule, IcsData } from '@shared/interfaces';

import {
  MEETINGS_SCHEDULE_GET,
  MEETING_ADD_ICS,
  MEETING_CREATE,
  MEETING_DELETE,
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
  async (id: number) => {
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
      const { data } = await axios.get<IMeetingSchedule[]>(
        API.MEETINGS_SCHEDULE
      );

      return data;
    } catch (error) {
      throw new Error('Server error...');
    }
  }
);

export const addMeeting = createAsyncThunk(
  MEETING_CREATE,
  async (payload: IMeetingSchedule) => {
    try {
      const { data } = await axios.post<IMeetingSchedule>(
        API.MEETINGS_SCHEDULE,
        payload
      );

      return data;
    } catch (error) {
      throw new Error('Server error...');
    }
  }
);

export const deleteMeeting = createAsyncThunk(
  MEETING_DELETE,
  async (id: number) => {
    try {
      await axios.delete<IMeetingSchedule>(API.MEETINGS_SCHEDULE_WITH_ID(id));

      return id;
    } catch (error) {
      throw new Error('Server error...');
    }
  }
);

export const addIcsMeeting = createAsyncThunk(
  MEETING_ADD_ICS,
  async (payload: IcsData) => {
    try {
      const { data } = await axios.post<IcsData>(
        API.MEETINGS_SCHEDULE,
        payload
      );

      return data;
    } catch (error) {
      throw new Error('Server error...');
    }
  }
);
