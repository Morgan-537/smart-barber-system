import React, { useEffect, useState } from "react";
import { CalendarDays, Clock3, LoaderCircle } from "lucide-react";
import Card from "../../components/Card";
import useAuth from "../../hooks/useAuth";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

const Schedule = () => {
  const { token, loading: authLoading } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;

    if (!token) {
      setLoading(false);
      setError("You are not authenticated.");
      return;
    }

    let mounted = true;

    const fetchSchedule = async () => {
      try {
        const response = await fetch(
          `${API_BASE}/api/barber/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load schedule."
          );
        }

        if (mounted) {
          setBookings(data.bookings || []);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchSchedule();

    return () => {
      mounted = false;
    };
  }, [token, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoaderCircle
          className="animate-spin text-violet-700"
          size={26}
        />
      </div>
    );
  }

  if (error) {
    return (
      <Card title="Schedule">
        <p className="text-red-600">{error}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">

      <section className="rounded-3xl bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-400 px-8 py-10 text-white shadow-xl">

        <h1 className="text-4xl font-black">
          My Schedule
        </h1>

        <p className="mt-4 text-violet-100">
          View all appointments assigned to you.
        </p>

      </section>

      <Card
        title="Upcoming Appointments"
        subtitle="Today's and upcoming bookings"
      >
        {bookings.length === 0 ? (
          <div className="py-8 text-center text-zinc-500">
            No appointments scheduled.
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b border-zinc-200">

                  <th className="py-3">Customer</th>
                  <th className="py-3">Service</th>
                  <th className="py-3">Date</th>
                  <th className="py-3">Time</th>
                  <th className="py-3">Status</th>

                </tr>

              </thead>

              <tbody>

                {bookings.map((booking) => (

                  <tr
                    key={booking.id}
                    className="border-b border-zinc-100 hover:bg-zinc-50 transition"
                  >

                    <td className="py-4">
                      {booking.customer}
                    </td>

                    <td className="py-4">
                      {booking.service}
                    </td>

                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={16} />
                        {booking.booking_date}
                      </div>
                    </td>

                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Clock3 size={16} />
                        {booking.booking_time}
                      </div>
                    </td>

                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold
                          ${
                            booking.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : booking.status === "Completed"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {booking.status}
                      </span>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}
      </Card>

    </div>
  );
};

export default Schedule;