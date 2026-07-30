import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import useAuth from "../../hooks/useAuth";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

export default function Users() {
  const { token } = useAuth();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const results = users.filter((user) => {
      const value = search.toLowerCase();

      return (
        user.full_name?.toLowerCase().includes(value) ||
        user.email?.toLowerCase().includes(value) ||
        user.role?.toLowerCase().includes(value)
      );
    });

    setFilteredUsers(results);
  }, [search, users]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${
            token || localStorage.getItem("access_token")
          }`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load users.");
      }

      setUsers(data.users || []);
      setFilteredUsers(data.users || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const badgeColor = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-purple-100 text-purple-700";

      case "barber":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-green-100 text-green-700";
    }
  };

  if (loading) {
    return (
      <Card title="Users">
        <p>Loading users...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card title="Users">
        <p className="text-red-600">{error}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">

      <section className="rounded-3xl bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-400 px-8 py-10 text-white shadow-xl">

        <h1 className="text-4xl font-black">
          User Management
        </h1>

        <p className="mt-4 text-violet-100">
          View and manage customers, barbers and administrators.
        </p>

      </section>

      <Card>

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 w-full rounded-xl border p-3"
        />

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="py-3 text-left">Name</th>
                <th className="py-3 text-left">Email</th>
                <th className="py-3 text-left">Role</th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.map((user) => (

                <tr
                  key={user.id}
                  className="border-b"
                >

                  <td className="py-4">
                    {user.full_name}
                  </td>

                  <td>
                    {user.email}
                  </td>

                  <td>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${badgeColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </Card>

    </div>
  );
}