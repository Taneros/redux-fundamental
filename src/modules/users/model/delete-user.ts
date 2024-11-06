import {AppThunk} from '../../../shared/redux';
import { UserId, usersSlice } from "../users.slice";
import { fetchUsers } from "./fetchUsers";

export const deleteUser =
  (userId: UserId): AppThunk<Promise<void>> =>
  async (dispatch, _getState, { api, router }) => {
    dispatch(usersSlice.actions.deleteUserPending());

    try {
      await api.deleteUser(userId);
      
      await router.navigate("/users");
      
      await dispatch(fetchUsers({ refetch: true }));
      
      dispatch(usersSlice.actions.deleteUserSuccess({userId}));
    } catch (error) {
      dispatch(usersSlice.actions.deleteUserFailed());
    }
  };
