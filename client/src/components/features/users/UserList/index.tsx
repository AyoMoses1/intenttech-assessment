// src/components/features/users/UserList/UserList.tsx


import { useDeleteUserMutation, useGetUsersQuery } from "@/features/users/UsersApi";
import { UserCard } from "../UserCard";

export function UserList() {
  const { data: users, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {users?.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onDelete={() => deleteUser(user.id)}
        />
      ))}
    </div>
  );
}
