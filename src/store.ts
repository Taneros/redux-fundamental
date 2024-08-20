import { configureStore, createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";

export type UserId = string;
export type User = {
  id: UserId;
  name: string;
  description: string;
};

export const users: User[] = Array.from({ length: 3000 }, (_, index) => ({
  id: `user${index + 11}`,
  name: `User ${index + 11}`,
  description: `Description for User ${index + 11}`,
}));

type UserState = {
  entities: Record<UserId, User>;
  ids: UserId[];
  selectedUserId: UserId | undefined;
};

type CounterState = {
  counter: number;
};

export type CounterId = string;

type State = {
  counters: Record<CounterId, CounterState | undefined>;
  users: UserState;
};

export type UserSelectedAction = {
  type: "userSelected";
  payload: {
    userId: UserId;
  };
};

export type UserRemoveSelectedAction = {
  type: "userRemoveSelected";
  payload: {
    userId: UserId;
  };
};

export type UsersStoredAction = {
  type: "userStored";
  payload: {
    users: User[];
  };
};

export type IncrementAction = {
  type: "increment";
  payload: {
    counterId: CounterId;
  };
};

export type DecrementAction = {
  type: "decrement";
  payload: {
    counterId: CounterId;
  };
};

type Action =
  | IncrementAction
  | DecrementAction
  | UserSelectedAction
  | UsersStoredAction
  | UserRemoveSelectedAction;

const initialUsersState: UserState = {
  entities: {},
  ids: [],
  selectedUserId: undefined,
};
const initialCounterState: CounterState = { counter: 0 };
const initialState: State = {
  counters: {},
  users: initialUsersState,
};

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case "increment": {
      const { counterId } = action.payload;
      const currentCounter = state.counters[counterId] ?? initialCounterState;
      return {
        ...state,
        counters: {
          ...state.counters,
          [counterId]: {
            ...currentCounter,
            counter: currentCounter.counter + 1,
          },
        },
      };
    }
    case "decrement": {
      const { counterId } = action.payload;
      const currentCounter = state.counters[counterId] ?? initialCounterState;
      return {
        ...state,
        counters: {
          ...state.counters,
          [counterId]: {
            ...currentCounter,
            counter: currentCounter.counter - 1,
          },
        },
      };
    }
    case "userStored": {
      const { users } = action.payload;

      return {
        ...state,
        users: {
          ...state.users,
          entities: users.reduce<Record<UserId, User>>((acc, user) => {
            acc[user.id] = user;
            return acc;
          }, {}),
          ids: users.map((user) => user.name),
        },
      };
    }

    case "userSelected": {
      const { userId } = action.payload;
      return {
        ...state,
        users: {
          ...state.users,
          selectedUserId: userId,
        },
      };
    }

    case "userRemoveSelected": {
      return {
        ...state,
        users: {
          ...state.users,
          selectedUserId: undefined,
        },
      };
    }
    default:
      return state;
  }
};

export const selectCounter = (state: AppState, counterId: CounterId) =>
  state.counters[counterId];

export const store = configureStore({
  reducer: reducer,
});

store.dispatch({
  type: "userStored",
  payload: { users },
} satisfies UsersStoredAction);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();