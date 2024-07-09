import { AppThunk } from "../../../shared/redux";
import { countersSlice } from "../../counters/counters.slice";
import { selectCountersSumm } from "./select-counters";
import { selectSortedUsers } from "./select-sorted-users";
import { usersSlice } from "./users.slice";

export const deleteCountersUsers =
  (): AppThunk<Promise<void>> => async (dispatch, getState) => {
    const countersSumm = selectCountersSumm(getState());
    const sortedUsers = selectSortedUsers(getState());

    const usersToDelete = sortedUsers.slice(0, countersSumm);

    dispatch(
      usersSlice.actions.deleteUsers({
        userIds: usersToDelete.map((u) => u.id),
      })
    );

    dispatch(countersSlice.actions.resetCounters());
  };
