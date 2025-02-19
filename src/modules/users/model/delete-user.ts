import { AppThunk } from '../../../shared/redux';
import { deleteUser, usersBaseKey } from '../api';
import { UserId } from './domain';
import { queryClient } from '../../../shared/api';

export const deleteUserThunk =
  (userId: UserId): AppThunk<Promise<void>> =>
  async (_dispatch, _, { router }) => {
    await queryClient.cancelQueries({ queryKey: [...usersBaseKey, userId] });

    await deleteUser(userId);

    await queryClient.invalidateQueries({
      queryKey: [...usersBaseKey, 'list'],
      exact: true,
    });

    await router.navigate('/users');
  };

export const deleteUserConfirmationThunk =
  (userId: UserId): AppThunk<Promise<void>> =>
  async (dispatch) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      await dispatch(deleteUserThunk(userId));
    }
  };
