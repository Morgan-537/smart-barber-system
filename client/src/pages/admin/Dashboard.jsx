import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  CalendarDays,
  Scissors,
  CreditCard,
  Package,
  ArrowUpRight,
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
      setLoading(false);
      setError("Authentication required.");
      return;
    }

    let mounted = true;

    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          `${API_BASE}/api/admin/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load dashboard.");
        }

        if (mounted) {
          setDashboard(data);
        }
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchDashboard();

    return () => {
      mounted = false;
    };
  }, [token, authLoading]);

  if (loading || authLoading) {
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
      <Card title="Admin Dashboard">
        <p className="text-red-600">{error}</p>
      </Card>
    );
  }

  const stats = dashboard?.statistics || {};
  const bookings = dashboard?.recent_bookings || [];

  const metrics = [
    {
      title: "Users",
      value: stats.total_users || 0,
      icon: Users,
      color: "from-violet-600 to-purple-700",
      link: "/admin/users",
    },
    {
      title: "Bookings",
      value: stats.total_bookings || 0,
      icon: CalendarDays,
      color: "from-orange-400 to-amber-500",
      link: "/admin/bookings",
    },
    {
      title: "Services",
      value: stats.total_services || 0,
      icon: Scissors,
      color: "from-red-500 to-rose-600",
      link: "/admin/services",
    },
    {
      title: "Payments",
      value: stats.total_payments || 0,
      icon: CreditCard,
      color: "from-green-500 to-emerald-600",
      link: "/admin/payments",
    },
    {
      title: "Inventory",
      value: stats.total_inventory_items || 0,
      icon: Package,
      color: "from-pink-500 to-fuchsia-600",
      link: "/admin/inventory",
    },
  ];

  const badge = (status) => {
    switch ((status || "").toLowerCase()) {
      case "approved":
      case "confirmed":
        return "bg-blue-100 text-blue-700";

      case "completed":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "cancelled":
      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-zinc-100 text-zinc-700";
    }
  };

  return (
    <div className="space-y-8">

      <section className="rounded-3xl bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-400 p-10 text-white shadow-xl">

        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-end">

          <div>

            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              Smart Barber Admin
            </span>

            <h1 className="mt-5 text-5xl font-black">
              Welcome, {user?.full_name}
            </h1>

            <p className="mt-4 max-w-3xl text-violet-100">
              Monitor customers, bookings, services,
              payments and overall platform activity.
            </p>

          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-violet-700 hover:bg-violet-50"
          >
            Visit Website
            <ArrowUpRight size={18} />
          </Link>

        </div>

      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

        {metrics.map((item) => {

          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              to={item.link}
            >
              <Card className="transition hover:-translate-y-1">

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white`}
                >
                  <Icon size={24} />
                </div>

                <p className="mt-5 text-sm uppercase text-zinc-500 font-semibold">
                  {item.title}
                </p>

                <h2 className="mt-2 text-4xl font-black">
                  {item.value}
                </h2>

              </Card>
            </Link>
          );

        })}

      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <Link to="/admin/services">
          <Card className="cursor-pointer hover:border-violet-500">
            <h2 className="text-xl font-bold">Services</h2>
            <p className="mt-2 text-zinc-600">
              Manage all barbershop services.
            </p>
          </Card>
        </Link>

        <Link to="/admin/users">
          <Card className="cursor-pointer hover:border-violet-500">
            <h2 className="text-xl font-bold">Users</h2>
            <p className="mt-2 text-zinc-600">
              Manage customers and barbers.
            </p>
          </Card>
        </Link>

        <Link to="/admin/bookings">
          <Card className="cursor-pointer hover:border-violet-500">
            <h2 className="text-xl font-bold">Bookings</h2>
            <p className="mt-2 text-zinc-600">
              Review all appointments.
            </p>
          </Card>
        </Link>

        <Link to="/admin/payments">
          <Card className="cursor-pointer hover:border-green-500">
            <h2 className="text-xl font-bold">
              Payments
            </h2>

            <p className="mt-2 text-zinc-600">
              View KCB Buni payment history.
            </p>
          </Card>
        </Link>

      </section>

      <Card
        title="Recent Bookings"
        subtitle="Latest booking activity"
      >

        {bookings.length === 0 ? (

          <p>No bookings available.</p>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b">

                  <th className="py-3">Customer</th>
                  <th className="py-3">Barber</th>
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
                    className="border-b"
                  >

                    <td className="py-4">
                      {booking.customer}
                    </td>

                    <td className="py-4">
                      {booking.barber}
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
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${badge(
                          booking.status
                        )}`}
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