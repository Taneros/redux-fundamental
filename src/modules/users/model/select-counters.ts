import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../../../shared/redux';

export const selectCountersSum = createSelector(
  (state: AppState) => state.counters,
  (counters) => {
    const total = Object.values(counters).reduce((acc, counter) => acc + (counter?.counter ?? 0), 0);
    return Math.max(total, 0);
  }
);
