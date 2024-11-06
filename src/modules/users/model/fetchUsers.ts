import { createAppAsyncThunk } from "../../../shared/redux";
import { usersSlice } from "../users.slice";

export const fetchUsers = createAppAsyncThunk(
  "users/fetchUsers",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_: { refetch: boolean } = { refetch: false }, thunkApi) =>
    thunkApi.extra.api.getUsers(),
  {
    condition({ refetch }, { getState }) {
      const isPending =
        usersSlice.selectors.selectIsFetchUsersPending(getState());

      if (!refetch && isPending) {
        return false;
      }

      return true;
    },
  },
);
