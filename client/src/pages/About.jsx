import React from "react";
import {
  CalendarDays,
  CreditCard,
  Bell,
 Briefcase,
} from "lucide-react";

import Card from "../components/Card";

const features = [
  {
    title: "Easy Booking",
    subtitle: "Book appointments anytime.",
    description:
      "Choose your preferred barber, service, and available time slot in just a few clicks.",
    icon: CalendarDays,
  },
  {
    title: "Secure Payments",
    subtitle: "Safe and reliable transactions.",
    description:
      "Complete payments securely through integrated M-Pesa services for a fast and convenient checkout process.",
    icon: CreditCard,
  },
  {
    title: "Appointment Reminders",
    subtitle: "Never miss your booking.",
    description:
      "Receive timely notifications and reminders before your scheduled appointment.",
    icon: Bell,
  },
  {
    title: "Business Management",
    subtitle: "Built for modern barbershops.",
    description:
      "Manage customers, services, inventory, reviews, and reports from a centralized dashboard.",
    icon: Briefcase,
  },
];

export default function About() {
  return (
    <div className="space-y-16">

      {/* Hero Section */}

      <section className="rounded-3xl bg-gradient-to-r from-sky-800 via-cyan-700 to-sky-600 px-10 py-20 text-center shadow-xl">

        <h1 className="text-5xl font-extrabold text-white">
          About SMARTBARBER
        </h1>

        <p className="mx-auto mt-8 max-w-4xl text-xl leading-9 text-sky-100">
          SMARTBARBER is a modern barbershop management platform built to
          simplify appointment booking, customer management, secure payments,
          and day-to-day business operations.

          <br />
          <br />

          Our mission is to provide customers with a seamless booking
          experience while giving barbers powerful tools to grow and manage
          their businesses efficiently.
        </p>

      </section>

      {/* Features */}

      <section>

        <div className="mb-12 text-center">

          <h2 className="text-4xl font-bold text-zinc-900">
            Everything You Need
          </h2>

          <p className="mt-4 text-lg text-zinc-600">
            Designed for customers, barbers, and administrators.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2">

          {features.map((feature) => (
            <Card
              key={feature.title}
              title={feature.title}
              subtitle={feature.subtitle}
            >
              <div className="mt-6 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-orange-100">

                  <feature.icon
                    size={28}
                    className="text-violet-700"
                  />

                </div>

                <p className="text-zinc-600">
                  {feature.description}
                </p>

              </div>
            </Card>
          ))}

        </div>

      </section>

    </div>
  );
}