import { configureStore } from '@reduxjs/toolkit';

// Stores
import moviesScheduleSlice from './movies/reducer';

const store = configureStore({
  reducer: {
    moviesSchedule: moviesScheduleSlice,
  },
});

// Global store type
export type RootState = ReturnType<typeof store.getState>;

// Dispatch type
export type AppDispatch = typeof store.dispatch;

export default store;
