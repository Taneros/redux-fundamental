import { memo } from "react";
import { User } from "./model/domain";
import { useNavigate } from "react-router-dom";
import { useAppDispath, useAppSelector } from "../../shared/redux";
import { usersListSlice } from "./model/users-list.slice";
import { selectSortedUsers } from "./model/select-sorted-users";
import { deleteCountersUsers } from "./model/delete-counters-users";
import { selectCounterSum } from "../counters";

export function UsersList() {
  const dispatch = useAppDispath();

  const countersSumm = useAppSelector(selectCounterSum);
  const sortedUsers = useAppSelector(selectSortedUsers);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-between">
        <div className="flex flex-row items-center">
          <button
            onClick={() => dispatch(usersListSlice.actions.setSortType("asc"))}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Asc
          </button>
          <button
            onClick={() => dispatch(usersListSlice.actions.setSortType("desc"))}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
          >
            Desc
          </button>
          {countersSumm !== 0 && (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => dispatch(deleteCountersUsers())}
            >
              Delete counter users ({countersSumm})
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
    navigate(user.id, { relative: "path" });
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
