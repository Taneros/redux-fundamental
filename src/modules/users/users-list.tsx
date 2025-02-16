import { memo } from 'react';
import { User } from './model/domain';
import { useNavigate } from 'react-router-dom';
import { useAppDispath, useAppSelector } from '../../shared/redux';
import { usersListSlice } from './model/users-list.slice';
import { selectCountersSum } from './model/select-counters';
import { selectSortedUsers } from './model/select-sorted-users';
import {deleteCountersUsers} from './model/delete-counters-users';

export function UsersList() {
  const dispatch = useAppDispath();

  const coutersSum = useAppSelector(selectCountersSum);

  const sortedUsers = useAppSelector(selectSortedUsers);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-between">
        <div className="flex flex-row items-center">
          <button
            onClick={() => dispatch(usersListSlice.actions.setSortType('asc'))}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Asc
          </button>
          <button
            onClick={() => dispatch(usersListSlice.actions.setSortType('desc'))}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
          >
            Desc
          </button>
          {coutersSum !== 0 && (
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => dispatch(deleteCountersUsers())}

            >
              Delete counter users {coutersSum}
            </button>
          )}
        </div>
        <ul className="list-none">
          {sortedUsers.map((user) => (
            <UserListItem user={user} key={user.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}

const UserListItem = memo(function UserListItem({ user }: { user: User }) {
  const navigate = useNavigate();
  const handleUserClick = () => {
    navigate(user.id, { relative: 'path' });
  };
  if (!user) {
    return null;
  }
  return (
    <li key={user.id} className="py-2" onClick={handleUserClick}>
      <span className="hover:underline cursor-pointer">{user.name}</span>
    </li>
  );
});
