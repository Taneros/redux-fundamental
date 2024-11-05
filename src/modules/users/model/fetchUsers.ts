import { AppThunk } from "../../../store";
import { usersSlice } from "../users.slice";

export const fetchUsers =
  ({ refetch }: { refetch: boolean } = { refetch: false }): AppThunk =>
  (dispatch, getState, { api }) => {
    const isIdle = usersSlice.selectors.selectIsFetchUsersIdle(getState());

    if (!isIdle && !refetch) {
      return;
    }

    dispatch(usersSlice.actions.fetchUsersPending());
    api
      .getUsers()
      .then((users) => {
        console.log(`model/fetchUsers.ts - line: 17 ->> users`, users);
        dispatch(usersSlice.actions.fetchUsersSuccess({ users }));
        dispatch(usersSlice.actions.fetchUsersSuccess({ users }));
      })
      .catch(() => {
        dispatch(usersSlice.actions.fetchUsersFailed());
      });
  };
