import { AppThunk } from "../../../store";
import { UserId, usersSlice } from "../users.slice";
import { fetchUsers } from "./fetchUsers";

export const deleteUser =
  (userId: UserId): AppThunk<Promise<void>> =>
  async (dispatch, _getState, { api }) => {
    dispatch(usersSlice.actions.deleteUserPending());

    try {
      await api.deleteUser(userId);
      dispatch(usersSlice.actions.deleteUserSuccess({ userId }));

      dispatch(fetchUsers({ refetch: true }));
    } catch (error) {
      dispatch(usersSlice.actions.deleteUserFailed());
    }
  };
