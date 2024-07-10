import { queryClient } from "../../../shared/api";
import { AppThunk } from "../../../shared/redux";
import { resetCountersAction, selectCounterSum } from "../../counters";
import { deleteUser, getUsersQueryOptions, usersBaseKey } from "../api";
import { sortUsers } from "./domain";
import { usersListSlice } from "./users-list.slice";

export const deleteCountersUsers =
  (): AppThunk<Promise<void>> => async (dispatch, getState) => {
    const users = await queryClient.fetchQuery(getUsersQueryOptions());
    const countersSumm = selectCounterSum(getState());
    const sortType = usersListSlice.selectors.sortType(getState());

    const sortedUsers = sortUsers(users, sortType);

    const usersToDelete = sortedUsers.slice(0, countersSumm);

    await Promise.all(usersToDelete.map((user) => deleteUser(user.id)));
    await queryClient.invalidateQueries({
      queryKey: usersBaseKey,
    });

    dispatch(resetCountersAction());
  };
