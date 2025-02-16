import { usersSlice } from './model/users.slice';

export { UserInfo } from './user-info';
export { UsersList } from './users-list';

export const storeInitialUsersAction = usersSlice.actions.stored;

export { usersApi } from './api';
