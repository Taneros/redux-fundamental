import { createAction, createReducer } from "@reduxjs/toolkit";
import { AppState } from "../../store";

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

export const countersReducer = (
  state = initialCountersState,
  action: Action,
): CountersState => {
  switch (action.type) {
    case "increment": {
      const { counterId } = action.payload;
      const currentCounter = state[counterId] ?? initialCounterState;
      return {
        ...state,
        [counterId]: {
          ...currentCounter,
          counter: currentCounter.counter + 1,
        },
      };
    }

    case "decrement": {
      const { counterId } = action.payload;
      const currentCounter = state[counterId] ?? initialCounterState;
      return {
        ...state,
        [counterId]: {
          ...currentCounter,
          counter: currentCounter.counter - 1,
        },
      };
    }
    default:
      return state;
  }
};

// циклическая зависимость! как избаваиться? архитекутра redux
export const selectCounter = (state: AppState, counterId: CounterId) =>
  state.counters[counterId];
