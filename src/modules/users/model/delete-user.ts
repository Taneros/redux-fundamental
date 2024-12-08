import { AppThunk } from "../../../shared/redux";
import { usersApi } from "../api";
import { UserId } from "../users.slice";

export const deleteUser =
  (userId: UserId): AppThunk<Promise<void>> =>
  async (dispatch, _getState, { router }) => {
    try {
      await dispatch(
        usersApi.endpoints.deleteUser.initiate(userId),
      );

      await router.navigate("/users");

      await dispatch(
        usersApi.util.invalidateTags([{ type: "Users", id: "LIST" }]),
      );
    } catch (error) {
      console.error(error);
    }
  };
