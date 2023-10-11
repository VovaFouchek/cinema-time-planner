import { configureStore } from '@reduxjs/toolkit';

// Stores
import scheduleSlice from './schedule/reducer';

const store = configureStore({
  reducer: {
    schedule: scheduleSlice,
  },
});

// Global store type
export type RootState = ReturnType<typeof store.getState>;

// Dispatch type
export type AppDispatch = typeof store.dispatch;

export default store;
