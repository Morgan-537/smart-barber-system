import React, { useEffect, useState } from "react";

import Card from "../../components/Card";
import Loader from "../../components/Loader";
import AdminTable from "../../components/AdminTable";
import StatusBadge from "../../components/StatusBadge";

import useAuth from "../../hooks/useAuth";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:5000";

const Users = () => {
  const { token } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE}/api/admin/users`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message || "Failed to load users."
          );
        }

        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(
          err.message || "Unable to load users."
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  const filteredUsers = users.filter((user) =>
    (
      `${user.full_name} ${user.email} ${user.phone} ${user.role}`
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <Loader text="Loading users..." />
    );
  }

  if (error) {
    return (
      <Card
        title="Users"
        subtitle="Manage system users"
      >
        <p className="text-sm text-red-500">
          {error}
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">

      <section className="rounded-3xl bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-400 px-8 py-10 text-white shadow-xl">

        <h1 className="text-4xl font-black">
          Users Management
        </h1>

        <p className="mt-4 text-violet-100">
          View and manage every registered
          customer, barber and administrator.
        </p>

      </section>

      <Card>

        <div className="mb-6">

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border border-violet-100 p-4 outline-none transition focus:border-violet-500"
          />

        </div>

        <AdminTable
          title="Registered Users"
          subtitle={`${filteredUsers.length} user(s) found`}
          columns={[
            "Name",
            "Email",
            "Phone",
            "Role",
            "Status",
            "Actions",
          ]}
          emptyMessage="No users found."
        >

          {filteredUsers.map((user) => (

            <tr
              key={user.id}
              className="border-b border-zinc-100 last:border-0"
            >

              <td className="px-6 py-4 font-medium text-zinc-900">
                {user.full_name}
              </td>

              <td className="px-6 py-4 text-zinc-700">
                {user.email}
              </td>

              <td className="px-6 py-4 text-zinc-700">
                {user.phone}
              </td>

              <td className="px-6 py-4 capitalize text-zinc-700">
                {user.role}
              </td>

              <td className="px-6 py-4">

                <StatusBadge
                  status={
                    user.is_active
                      ? "active"
                      : "inactive"
                  }
                />

              </td>

              <td className="px-6 py-4">

                <button
                  className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
                >
                  View
                </button>

              </td>

            </tr>

          ))}

        </AdminTable>

      </Card>

    </div>
  );
};

export default Users;