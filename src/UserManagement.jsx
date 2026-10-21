import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const USERS_STORAGE_KEY = "tanstack-query-assignment-users";
const initialUsers = [
  {
    id: 1,
    firstName: "Sachin",
    lastName: "Tendulkar",
    email: "sachin@example.com",
    role: "Admin",
  },
  {
    id: 2,
    firstName: "Virat",
    lastName: "Kohli",
    email: "virat@example.com",
    role: "Editor",
  },
  {
    id: 3,
    firstName: "Rohit",
    lastName: "Sharma",
    email: "rohit@example.com",
    role: "Viewer",
  },
];

function readUsers() {
  const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
  if (storedUsers) return JSON.parse(storedUsers);

  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
  return initialUsers;
}

function saveUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

async function fetchUsers() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { users: readUsers() };
}

async function createUser(user) {
  const users = readUsers();
  const [firstName, ...lastNameParts] = user.name.trim().split(/\s+/);
  const newUser = {
    id: Date.now(),
    firstName,
    lastName: lastNameParts.join(" "),
    email: user.email.trim(),
    role: user.role.trim(),
  };

  saveUsers([...users, newUser]);
  return newUser;
}

async function deleteUser(userId) {
  const users = readUsers();
  saveUsers(users.filter((user) => user.id !== userId));
}

function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}

function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });
      const previousUsers = queryClient.getQueryData(["users"]);

      queryClient.setQueryData(["users"], (currentUsers) => {
        if (!currentUsers) return currentUsers;
        return {
          ...currentUsers,
          users: currentUsers.users.filter((user) => user.id !== userId),
        };
      });

      return { previousUsers };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

function UserManagement() {
  const [form, setForm] = useState({ name: "", email: "", role: "" });
  const usersQuery = useUsers();
  const createMutation = useCreateUser();
  const deleteMutation = useDeleteUser();

  function handleSubmit(event) {
    event.preventDefault();
    createMutation.mutate(form, {
      onSuccess: () => setForm({ name: "", email: "", role: "" }),
    });
  }

  return (
    <section>
      <h1>User Management</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
        </label>
        <label>
          Email
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
          />
        </label>
        <label>
          Role
          <input
            required
            value={form.role}
            onChange={(event) => setForm({ ...form, role: event.target.value })}
          />
        </label>
        <button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? "Creating user..." : "Create User"}
        </button>
      </form>
      {createMutation.isSuccess && (
        <p role="status">User created successfully.</p>
      )}
      {createMutation.isError && (
        <p role="alert">{createMutation.error.message}</p>
      )}
      {deleteMutation.isPending && <p>Deleting user...</p>}
      {deleteMutation.isError && (
        <p role="alert">{deleteMutation.error.message}. User restored.</p>
      )}
      {deleteMutation.isSuccess && <p role="status">User deleted.</p>}

      <button
        type="button"
        onClick={() => usersQuery.refetch()}
        disabled={usersQuery.isFetching}
      >
        {usersQuery.isFetching ? "Refreshing users..." : "Refresh Users"}
      </button>
      {usersQuery.isPending && <p>Loading users...</p>}
      {usersQuery.isFetching && !usersQuery.isPending && (
        <p>Updating users...</p>
      )}
      {usersQuery.isError && <p role="alert">{usersQuery.error.message}</p>}
      {usersQuery.isSuccess && (
        <ul>
          {usersQuery.data.users.map((user) => (
            <li key={user.id}>
              <strong>
                {user.firstName} {user.lastName}
              </strong>
              <span> {user.email}</span>
              <span> | {user.role || user.company?.title || "User"}</span>
              <button
                type="button"
                onClick={() => deleteMutation.mutate(user.id)}
                disabled={deleteMutation.isPending}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default UserManagement;
