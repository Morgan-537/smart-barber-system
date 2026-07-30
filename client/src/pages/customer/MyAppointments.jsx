import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function MyAppointments() {
  const { token } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError("");

        const authToken = token || localStorage.getItem("access_token");

        const response = await fetch(`${API_BASE}/api/bookings`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(data?.message || "Unable to load appointments.");
        }

        setAppointments(data.bookings || data || []);
      } catch (err) {
        setError(err.message || "Unable to load appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [token]);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-400 px-8 py-10 text-white shadow-xl">
        <h1 className="text-4xl font-black">My Appointments</h1>
        <p className="mt-4 max-w-2xl text-violet-100">
          Manage all your upcoming and previous appointments.
        </p>
      </section>

      {loading && (
        <Card title="Loading">
          <p className="text-zinc-600">Fetching your appointments...</p>
        </Card>
      )}

      {error && (
        <Card title="Error">
          <p className="text-red-600">{error}</p>
        </Card>
      )}

      {!loading && !error && appointments.length === 0 && (
        <Card title="No Appointments Yet">
          <p className="text-zinc-600">
            You have not booked any appointments yet.
          </p>
        </Card>
      )}

      <div className="space-y-6">
        {appointments.map((appointment) => (
          <Card key={appointment.id}>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-zinc-900">
                  {appointment.service || "Service"}
                </h2>

                <p className="text-zinc-600">
                  Barber: {appointment.barber || "—"}
                </p>

                <p className="text-zinc-600">
                  Date: {appointment.booking_date || "—"}
                </p>

                <p className="text-zinc-600">
                  Time: {appointment.booking_time || "—"}
                </p>

                {appointment.notes && (
                  <p className="max-w-2xl text-sm text-zinc-500">
                    Notes: {appointment.notes}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-start gap-4 md:items-end">
                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    statusStyles[appointment.status] ||
                    "bg-zinc-100 text-zinc-700"
                  }`}
                >
                  {appointment.status || "Pending"}
                </span>

                <Button variant="outline" type="button">
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}