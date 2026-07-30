import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

export default function Profile() {
  const { user, token, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "",
        confirm_password: "",
      });
    }
  }, [user]);

  // Keep the rest of your file exactly as it is...

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setError("");
    setSuccess("");

    if (isEditing && user) {
      setFormData({
        full_name: user.full_name || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "",
        confirm_password: "",
      });
    }

    setIsEditing((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password && formData.password !== formData.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const payload = {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
      };

      if (formData.password) {
        payload.password = formData.password;
      }

      const response = await fetch(`${API_BASE}/api/auth/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data?.message || data?.msg || "Unable to update profile."
        );
      }

      if (data?.user) {
        updateUser(data.user);
      }

      setSuccess("Profile updated successfully.");
      setIsEditing(false);
      setFormData((prev) => ({
        ...prev,
        password: "",
        confirm_password: "",
      }));
    } catch (err) {
      setError(err.message || "Unable to update profile.");
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-400 px-8 py-10 text-white shadow-xl">
        <h1 className="text-4xl font-black">My Profile</h1>
        <p className="mt-4 text-violet-100">
          View and manage your SMARTBARBER account information.
        </p>
      </section>

      <Card>
        {success && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex flex-col items-center">
          <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-4xl font-bold text-white shadow-lg">
            {(user?.full_name?.[0] || "U").toUpperCase()}
          </div>

          <h2 className="text-3xl font-bold text-zinc-900">
            {user?.full_name || "User"}
          </h2>

          <p className="mt-2 text-zinc-600">
            {user?.email || "No email available"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-semibold text-zinc-700">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-xl border border-violet-100 bg-white p-4 outline-none transition disabled:bg-zinc-100"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-zinc-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-xl border border-violet-100 bg-white p-4 outline-none transition disabled:bg-zinc-100"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-zinc-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-xl border border-violet-100 bg-white p-4 outline-none transition disabled:bg-zinc-100"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-zinc-700">
                Member Since
              </label>
              <input
                type="text"
                value={user?.created_at?.slice(0, 10) || "—"}
                readOnly
                className="w-full rounded-xl border border-violet-100 bg-white p-4"
              />
            </div>
          </div>

          {isEditing && (
            <>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-semibold text-zinc-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current password"
                    className="w-full rounded-xl border border-violet-100 bg-white p-4 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-zinc-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    placeholder="Repeat new password"
                    className="w-full rounded-xl border border-violet-100 bg-white p-4 outline-none"
                  />
                </div>
              </div>

              <p className="text-sm text-zinc-500">
                Password changes will be saved to the backend.
              </p>
            </>
          )}

          <div className="flex flex-wrap justify-end gap-4">
            <Button type="button" variant="outline" onClick={handleEditToggle}>
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>

            {isEditing && (
              <Button type="submit">
                Save Changes
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}