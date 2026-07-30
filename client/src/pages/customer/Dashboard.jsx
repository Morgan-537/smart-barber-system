import React from "react";
import { Link } from "react-router-dom";
import {
  CalendarPlus,
  CalendarDays,
  CreditCard,
  Bell,
  User,
  ArrowRight,
} from "lucide-react";

const actions = [
  {
    title: "Book Appointment",
    description: "Reserve your next haircut or grooming session.",
    icon: CalendarPlus,
    link: "/customer/book",
    color: "from-violet-600 to-fuchsia-500",
  },
  {
    title: "My Appointments",
    description: "View your upcoming and completed bookings.",
    icon: CalendarDays,
    link: "/customer/appointments",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Payments",
    description: "View payment history and receipts.",
    icon: CreditCard,
    link: "/customer/payments",
    color: "from-amber-400 to-orange-500",
  },
  {
    title: "Notifications",
    description: "Stay updated with reminders and alerts.",
    icon: Bell,
    link: "/customer/notifications",
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Profile",
    description: "Manage your account information.",
    icon: User,
    link: "/customer/profile",
    color: "from-emerald-500 to-teal-500",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-10">

      <section className="rounded-3xl bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-400 px-8 py-10 text-white shadow-xl">

        <h1 className="text-5xl font-black">
          Welcome Back 👋
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-violet-100">
          Everything you need to manage your SMARTBARBER experience is right
          here.
        </p>

      </section>

      <section>

        <h2 className="mb-6 text-3xl font-bold text-zinc-900">
          Quick Actions
        </h2>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {actions.map((action) => (
            <Link
              key={action.title}
              to={action.link}
              className="group rounded-3xl border border-violet-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div
                className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${action.color}`}
              >
                <action.icon
                  className="text-white"
                  size={30}
                />
              </div>

              <h3 className="text-2xl font-bold text-zinc-900">
                {action.title}
              </h3>

              <p className="mt-3 leading-7 text-zinc-600">
                {action.description}
              </p>

              <div className="mt-8 flex items-center gap-2 font-semibold text-violet-700 transition-all group-hover:gap-4">
                Open
                <ArrowRight size={18} />
              </div>

            </Link>
          ))}

        </div>

      </section>

    </div>
  );
}