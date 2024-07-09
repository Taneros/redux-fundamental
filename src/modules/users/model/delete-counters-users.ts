import { AppThunk } from "../../../shared/redux";
import { resetCountersAction, selectCounterSum } from "../../counters";
import { selectSortedUsers } from "./select-sorted-users";
import { usersSlice } from "./users.slice";

export const deleteCountersUsers =
  (): AppThunk<Promise<void>> => async (dispatch, getState) => {
    const countersSumm = selectCounterSum(getState());
    const sortedUsers = selectSortedUsers(getState());

    const usersToDelete = sortedUsers.slice(0, countersSumm);

    dispatch(
      usersSlice.actions.deleteUsers({
        userIds: usersToDelete.map((u) => u.id),
      })
    );

    dispatch(resetCountersAction());
  };
