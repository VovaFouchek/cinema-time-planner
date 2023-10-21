import { createSlice } from '@reduxjs/toolkit';
import { IMovieSchedule } from '@shared/interfaces';
import {
  addMeeting,
  deleteMeeting,
  getMeetingsSchedule,
  getMovieById,
  getMoviesSchedule,
} from './actions';

import { IScheduleReducer } from './interfaces';

const initialValue: IScheduleReducer = {
  isOpenCreatedFormModal: false,
  moviesSchedule: [],
  meetingsSchedule: [],
  movieDetails: {} as IMovieSchedule,
  isLoading: false,
  error: null,
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: initialValue,
  reducers: {
    setOpenCreatedFormModal(state) {
      state.isOpenCreatedFormModal = true;
    },
    setCloseCreatedFormModal(state) {
      state.isOpenCreatedFormModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(getMoviesSchedule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMeetingsSchedule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMovieById.pending, (state) => {
        state.isLoading = true;
      })
      // Fulfilled
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
      .addCase(addMeeting.fulfilled, (state, action) => {
        state.meetingsSchedule = [...state.meetingsSchedule, action.payload];
      })
      .addCase(deleteMeeting.fulfilled, (state, action) => {
        state.meetingsSchedule = state.meetingsSchedule.filter(
          (meeting) => meeting.id !== action.payload
        );
      })
      // Rejected
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
      })
      .addCase(addMeeting.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteMeeting.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setOpenCreatedFormModal, setCloseCreatedFormModal } =
  scheduleSlice.actions;

export default scheduleSlice.reducer;
