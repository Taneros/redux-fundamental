import { useNavigate, useParams } from "react-router-dom";
import { UserId } from "./model/domain";
import { useAppDispath } from "../../shared/redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserQueryOptions } from "./api";
import { deleteUserThunk } from "./model/delete-user";

export function UserInfo() {
  const dispatch = useAppDispath();
  const navigate = useNavigate();
  const { id } = useParams<{ id: UserId }>();

  const { data: user } = useQuery({
    ...getUserQueryOptions(id ?? ""),
    enabled: Boolean(id),
  });

  const deleteUserMutation = useMutation({
    mutationFn: async () => {
      if (!id) {
        return;
      }
      await dispatch(deleteUserThunk(id));
    },
  });

  const handleBackButtonClick = () => {
    navigate("..", { relative: "path" });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleBackButtonClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md"
      >
        Back
      </button>
      <h2 className="text-3xl">{user.name}</h2>
      <p className="text-xl">{user.description}</p>
      <button
        onClick={() => deleteUserMutation.mutate()}
        disabled={deleteUserMutation.isPending}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Delete
      </button>
    </div>
  );
}
