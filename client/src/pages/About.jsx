import React from "react";
import Card from "../components/Card";

const About = () => {
  return (
    <section className="mx-auto max-w-5xl py-12">
      <h1 className="mb-6 text-4xl font-bold text-white">
        About Smart Barber System
      </h1>

      <p className="mb-10 leading-relaxed text-zinc-400">
        Smart Barber System is a modern barbershop management platform designed
        to simplify appointment booking, customer management, secure payments,
        and business operations. Our goal is to provide customers with a smooth
        booking experience while helping barbers and administrators manage their
        daily activities efficiently.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <Card
          title="Easy Booking"
          subtitle="Book appointments anytime."
        >
          <p className="text-zinc-300">
            Choose your preferred barber, service, and available time slot in
            just a few clicks.
          </p>
        </Card>

        <Card
          title="Secure Payments"
          subtitle="Safe and reliable transactions."
        >
          <p className="text-zinc-300">
            Complete payments securely through integrated M-Pesa services for a
            fast and convenient checkout process.
          </p>
        </Card>

        <Card
          title="Appointment Reminders"
          subtitle="Never miss your booking."
        >
          <p className="text-zinc-300">
            Receive timely notifications and reminders before your scheduled
            appointment.
          </p>
        </Card>

        <Card
          title="Business Management"
          subtitle="Built for modern barbershops."
        >
          <p className="text-zinc-300">
            Manage customers, services, inventory, reviews, and reports from a
            centralized dashboard.
          </p>
        </Card>
      </div>
    </section>
  );
};

export default About;