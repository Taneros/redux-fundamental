import { AppThunk } from '../../../shared/redux';
import { resetCountersAction, selectCountersSum } from '../../counters';
import { selectSortedUsers } from './select-sorted-users';
import { usersSlice } from './users.slice';

export const deleteCountersUsers = (): AppThunk<Promise<void>> => async (dispatch, getState) => {
  const countersSum = selectCountersSum(getState());

  const sortedUsers = selectSortedUsers(getState());

  const usersToDelete = sortedUsers.slice(0, countersSum);

  dispatch(usersSlice.actions.deleteUsers({ userIds: usersToDelete.map((user) => user.id) }));

  dispatch(resetCountersAction());
};
