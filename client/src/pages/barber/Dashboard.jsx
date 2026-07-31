import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  CheckCircle,
  Clock3,
  LoaderCircle,
} from "lucide-react";

import Card from "../../components/Card";
import useAuth from "../../hooks/useAuth";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

export default function Dashboard() {
  const { user, token, loading: authLoading } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;

    if (!token) {
      setError("You are not authenticated.");
      setLoading(false);
      return;
    }

    const fetchDashboard = async () => {
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
            data.message || "Unable to load dashboard."
          );
        }

        setDashboard(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [authLoading, token]);

  if (authLoading || loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <LoaderCircle
          className="animate-spin text-violet-700"
          size={28}
        />
      </div>
    );
  }

  if (error) {
    return (
      <Card title="Barber Dashboard">
        <p className="text-red-600">{error}</p>
      </Card>
    );
  }

  const stats = dashboard?.statistics || {};
  const bookings = dashboard?.bookings || [];

  const cards = [
    {
      title: "Total",
      value: stats.total_bookings || 0,
      icon: CalendarDays,
      color: "from-violet-600 to-purple-700",
      link: "/barber/appointments",
    },
    {
      title: "Pending",
      value: stats.pending || 0,
      icon: Clock3,
      color: "from-amber-400 to-orange-500",
      link: "/barber/appointments?status=Pending",
    },
    {
      title: "Approved",
      value: stats.approved || 0,
      icon: CheckCircle,
      color: "from-green-500 to-emerald-600",
      link: "/barber/appointments?status=Approved",
    },
    {
      title: "Completed",
      value: stats.completed || 0,
      icon: CheckCircle,
      color: "from-sky-500 to-cyan-600",
      link: "/barber/appointments?status=Completed",
    },
  ];

  return (
    <div className="space-y-8">

      <section className="rounded-3xl bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-400 px-8 py-10 text-white shadow-xl">

        <h1 className="text-4xl font-black">
          Welcome back, {user?.full_name}
        </h1>

        <p className="mt-4 text-violet-100">
          Manage your appointments and daily schedule.
        </p>

      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.title}
              to={card.link}
              className="transition hover:-translate-y-1"
            >
              <Card>

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} text-white shadow-lg`}
                >
                  <Icon size={24} />
                </div>

                <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-zinc-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-4xl font-black text-zinc-900">
                  {card.value}
                </h2>

              </Card>
            </Link>
          );
        })}

      </section>

      <Card
        title="Recent Appointments"
        subtitle="Customers assigned to you"
      >

        {bookings.length === 0 ? (

          <p className="text-zinc-500">
            No appointments assigned.
          </p>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="border-b">

                <tr>

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
                    className="border-b hover:bg-zinc-50"
                  >

                    <td className="py-4">
                      {booking.customer}
                    </td>

                    <td className="py-4">
                      {booking.service}
                    </td>

                    <td className="py-4">
                      {booking.booking_date}
                    </td>

                    <td className="py-4">
                      {booking.booking_time}
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
}