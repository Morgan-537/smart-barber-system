import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import { useAuth } from "../../context/AuthContext";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

export default function Notifications() {
  const { token } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError("");

        const authToken = token || localStorage.getItem("access_token");

        const response = await fetch(`${API_BASE}/api/notifications`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(data?.message || "Unable to load notifications.");
        }

        setNotifications(data.notifications || []);
      } catch (err) {
        setError(err.message || "Unable to load notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [token]);

  const handleMarkAsRead = async (notificationId) => {
    try {
      setError("");

      const authToken = token || localStorage.getItem("access_token");

      const response = await fetch(
        `${API_BASE}/api/notifications/${notificationId}/read`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.message || "Unable to update notification.");
      }

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification
        )
      );
    } catch (err) {
      setError(err.message || "Unable to update notification.");
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-400 px-8 py-10 text-white shadow-xl">
        <h1 className="text-4xl font-black">Notifications</h1>
        <p className="mt-4 text-violet-100">
          Stay updated with bookings, payments, and reminders.
        </p>
      </section>

      {loading && (
        <Card title="Loading Notifications">
          <p className="text-zinc-600">Fetching your notifications...</p>
        </Card>
      )}

      {error && (
        <Card title="Error">
          <p className="text-red-600">{error}</p>
        </Card>
      )}

      {!loading && !error && notifications.length === 0 && (
        <Card title="No Notifications">
          <p className="text-zinc-600">
            You do not have any notifications yet.
          </p>
        </Card>
      )}

      <div className="space-y-5">
        {notifications.map((notification) => (
          <Card key={notification.id}>
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-bold text-zinc-900">
                    {notification.title}
                  </h2>

                  {!notification.is_read && (
                    <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                      NEW
                    </span>
                  )}

                  {notification.is_read && (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                      Read
                    </span>
                  )}
                </div>

                <p className="text-zinc-600">
                  {notification.message}
                </p>
              </div>

              {!notification.is_read && (
                <button
                  type="button"
                  onClick={() => handleMarkAsRead(notification.id)}
                  className="rounded-xl border border-violet-300 px-4 py-2 font-semibold text-violet-700 transition hover:bg-violet-50"
                >
                  Mark as Read
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}