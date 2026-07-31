import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";
import AdminTable from "../components/AdminTable";
import StatusBadge from "../components/StatusBadge";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token =
      localStorage.getItem("access_token") ||
      localStorage.getItem("token");

    fetch("/api/admin/bookings", {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load bookings");
        return res.json();
      })
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .catch(() => setError("Unable to load bookings."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader text="Loading bookings..." />;

  if (error) {
    return (
      <Card title="Bookings" subtitle="Manage all appointments">
        <p className="text-sm text-red-400">{error}</p>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Bookings</h1>
        <p className="mt-2 text-zinc-400">
          View all appointments in the system.
        </p>
      </div>

      <AdminTable
        title="Booking List"
        subtitle="All customer appointments"
        columns={["Customer", "Barber", "Service", "Date", "Time", "Status"]}
        emptyMessage="No bookings found."
      >
        {bookings.map((booking) => (
          <tr key={booking.id} className="border-b border-zinc-800/60">
            <td className="px-6 py-4 text-zinc-200">{booking.customer || "—"}</td>
            <td className="px-6 py-4 text-zinc-300">{booking.barber || "—"}</td>
            <td className="px-6 py-4 text-zinc-300">{booking.service || "—"}</td>
            <td className="px-6 py-4 text-zinc-300">{booking.booking_date || "—"}</td>
            <td className="px-6 py-4 text-zinc-300">{booking.booking_time || "—"}</td>
            <td className="px-6 py-4">
              <StatusBadge status={booking.status} />
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
};

export default Bookings;