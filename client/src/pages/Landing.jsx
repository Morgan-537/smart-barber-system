import React from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  CreditCard,
  Bell,
  Scissors,
  Star,
} from "lucide-react";

import Button from "../components/Button";
import Card from "../components/Card";

const features = [
  {
    title: "Online Booking",
    description:
      "Reserve your favorite barber in seconds without making a phone call.",
    icon: CalendarDays,
  },
  {
    title: "Professional Services",
    description:
      "Browse experienced barbers and premium grooming services.",
    icon: Scissors,
  },
  {
    title: "Instant Notifications",
    description:
      "Never miss another appointment with automatic reminders.",
    icon: Bell,
  },
  {
    title: "Secure Payments",
    description:
      "Pay safely using M-Pesa and other supported payment methods.",
    icon: CreditCard,
  },
];

const stats = [
  {
    value: "24/7",
    label: "Online Booking",
    color: "from-violet-500 to-purple-600",
  },
  {
    value: "1000+",
    label: "Successful Appointments",
    color: "from-amber-400 to-orange-500",
  },
  {
    value: "★ 4.9",
    label: "Customer Rating",
    color: "from-pink-500 to-rose-500",
  },
];

export default function Landing() {
  return (
    <div className="space-y-24">
      <section className="mx-auto grid max-w-7xl items-center gap-16 px-8 py-24 lg:grid-cols-2">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-5 py-2 text-sm font-semibold text-violet-700">
            <Star size={16} />
            Modern Barber Booking Platform
          </span>

          <h1 className="mt-8 text-6xl font-black leading-tight text-zinc-900">
            Precision Cuts.
            <br />
            <span className="bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-500 bg-clip-text text-transparent">
              Zero Waiting Time.
            </span>
          </h1>

          <p className="mt-8 text-xl leading-9 text-zinc-600">
            Experience effortless appointment scheduling, secure payments,
            instant reminders, and professional grooming—beautifully designed
            for modern customers.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <Link to="/register">
              <Button>Book Appointment</Button>
            </Link>

            <Link to="/about">
              <Button variant="outline">Learn More</Button>
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-3">
            <div className="flex text-amber-500">★★★★★</div>

            <p className="text-zinc-600">
              Trusted by over
              <span className="font-bold text-zinc-900"> 1,000 customers</span>
            </p>
          </div>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=900"
            alt="Modern Barber"
            className="w-full rounded-[40px] object-cover shadow-2xl"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8 pb-24">
        <div className="grid gap-8 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-violet-100 bg-[#FFFDFC] p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div
                className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${stat.color}`}
              >
                <span className="text-2xl font-bold text-white">
                  {stat.value.includes("★") ? "★" : stat.value[0]}
                </span>
              </div>

              <h3 className="text-4xl font-extrabold text-zinc-900">
                {stat.value}
              </h3>

              <p className="mt-3 text-lg text-zinc-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8 pb-24">
        <div className="mb-14 text-center">
          <h2 className="text-5xl font-black text-zinc-900">
            Why Choose SMARTBARBER?
          </h2>

          <p className="mt-5 text-lg text-zinc-600">
            Everything you need for a premium grooming experience.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature) => (
            <Card
              key={feature.title}
              title={feature.title}
              subtitle={feature.description}
              className="transition duration-300 hover:-translate-y-2 hover:border-violet-400"
            >
              <feature.icon className="mt-6 text-violet-700" size={40} />
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}