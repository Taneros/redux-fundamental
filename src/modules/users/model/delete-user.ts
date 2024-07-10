import { queryClient } from "../../../shared/api";
import { AppThunk } from "../../../shared/redux";
import { deleteUser, usersBaseKey } from "../api";
import { UserId } from "./domain";

export const deleteUserThunk =
  (userId: UserId): AppThunk<Promise<void>> =>
  async (__, _, { router }) => {
    await deleteUser(userId);
    await router.navigate("/users");
    await queryClient.invalidateQueries({
      queryKey: usersBaseKey,
    });
  };
