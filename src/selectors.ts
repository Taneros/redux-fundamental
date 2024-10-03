import { createAppSelector, AppState, CounterId } from "./store";

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

export const selectCounter = (state: AppState, counterId: CounterId) =>
  state.counters[counterId];
