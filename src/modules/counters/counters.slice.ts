import { createAction, createReducer } from "@reduxjs/toolkit";
import { AppState } from "../../shared/redux";

type CounterState = {
  counter: number;
};

type CountersState = Record<CounterId, CounterState | undefined>;

export type CounterId = string;

createAction;
createReducer;

type ActionPayload = {
  counterId: CounterId;
};

export const incrementAction =
  createAction<ActionPayload>("counters/increment");
export const decrementAction =
  createAction<ActionPayload>("counters/decrement");

const initialCounterState: CounterState = { counter: 0 };

const initialCountersState: CountersState = {};

export const countersReducer = createReducer(
  initialCountersState,
  (builder) => {
    builder.addCase(incrementAction, (state, action) => {
      const { counterId } = action.payload;

      if (!state[counterId]) {
        state[counterId] = initialCounterState;
      }

      state[counterId].counter + 1;
    });
    builder.addCase(decrementAction, (state, action) => {
      const { counterId } = action.payload;

      if (!state[counterId]) {
        state[counterId] = initialCounterState;
      }

      state[counterId].counter - 1;
    });
  },
);

// циклическая зависимость! как избаваиться? архитекутра redux
export const selectCounter = (state: AppState, counterId: CounterId) =>
  state.counters[counterId];
