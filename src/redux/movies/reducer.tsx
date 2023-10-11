import { createSlice } from '@reduxjs/toolkit';
import { getMoviesSchedule } from './actions';

import { IMoviesScheduleReducer } from './interfaces';

const initialValue: IMoviesScheduleReducer = {
  moviesSchedule: [],
  isLoading: false,
  error: null,
};

const moviesScheduleSlice = createSlice({
  name: 'moviesSchedule',
  initialState: initialValue,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMoviesSchedule.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMoviesSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.moviesSchedule = action.payload;
      })
      .addCase(getMoviesSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// export const {  } = moviesScheduleSlice.actions;
export default moviesScheduleSlice.reducer;
