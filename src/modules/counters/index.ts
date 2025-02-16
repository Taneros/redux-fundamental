export { Counters } from './counters';

import { countersSlice } from './counters.slice';

export const selectCountersSum = countersSlice.selectors.countersSum;

export const resetCountersAction = countersSlice.actions.resetCounters;
