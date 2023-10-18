import { createSlice } from '@reduxjs/toolkit';
import { IMovieSchedule } from '@shared/interfaces';
import {
  getMeetingsSchedule,
  getMovieById,
  getMoviesSchedule,
} from './actions';

import { IScheduleReducer } from './interfaces';

const initialValue: IScheduleReducer = {
  moviesSchedule: [],
  meetingsSchedule: [],
  movieDetails: {} as IMovieSchedule,
  isLoading: false,
  error: null,
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: initialValue,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMoviesSchedule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMeetingsSchedule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMovieById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMoviesSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.moviesSchedule = action.payload;
      })
      .addCase(getMeetingsSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.meetingsSchedule = action.payload;
      })
      .addCase(getMovieById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.movieDetails = action.payload;
      })
      .addCase(getMoviesSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getMeetingsSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getMovieById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default scheduleSlice.reducer;
