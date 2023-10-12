import { createSlice } from '@reduxjs/toolkit';
import { getMeetingsSchedule, getMoviesSchedule } from './actions';

import { IScheduleReducer } from './interfaces';

const initialValue: IScheduleReducer = {
  moviesSchedule: [],
  meetingsSchedule: [],
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
      .addCase(getMoviesSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.moviesSchedule = action.payload;
      })
      .addCase(getMeetingsSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.meetingsSchedule = action.payload;
      })
      .addCase(getMoviesSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getMeetingsSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default scheduleSlice.reducer;
