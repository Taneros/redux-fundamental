import { AppState, createAppSelector } from "../../store";

export type UserId = string;
export type User = {
  id: UserId;
  name: string;
  description: string;
};

export const initialUsersList: User[] = Array.from(
  { length: 3000 },
  (_, index) => ({
    id: `user${index + 11}`,
    name: `User ${index + 11}`,
    description: `Description for User ${index + 11}`,
  }),
);

type UserState = {
  entities: Record<UserId, User>;
  ids: UserId[];
  selectedUserId: UserId | undefined;
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

type Action = UserSelectedAction | UsersStoredAction | UserRemoveSelectedAction;

const initialUsersState: UserState = {
  entities: {},
  ids: [],
  selectedUserId: undefined,
};

export const usersReducer = (
  state = initialUsersState,
  action: Action,
): UserState => {
  switch (action.type) {
    case "userStored": {
      const { users } = action.payload;

      return {
        ...state,
        entities: users.reduce<Record<UserId, User>>((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {}),
        ids: users.map((user) => user.name),
      };
    }

    case "userSelected": {
      const { userId } = action.payload;
      return {
        ...state,
        selectedUserId: userId,
      };
    }

    case "userRemoveSelected": {
      return {
        ...state,
        selectedUserId: undefined,
      };
    }
    default:
      return state;
  }
};

export const selectSortedUsers = createAppSelector(
  (state: AppState) => state.users.ids,
  (state: AppState) => state.users.entities,
  (_: AppState, sort: "asc" | "desc") => sort,
  (ids, entities, sort) =>
    ids
      .map((id) => entities[id])
      .sort((a, b) => {
        if (sort === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      }),
);

export const selectSelectedUsers = ({
  users: { selectedUserId, entities },
}: AppState) => (selectedUserId ? entities[selectedUserId] : undefined);
