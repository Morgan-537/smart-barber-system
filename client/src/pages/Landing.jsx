import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Landing = () => {
  return (
    <section className="flex flex-col items-center justify-center py-20 text-center">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-extrabold leading-tight text-white md:text-6xl">
          Precision Cuts,
          <span className="block text-red-500">
            Zero Wait Times.
          </span>
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-zinc-400">
          Book your barber online, manage appointments, receive notifications,
          and pay securely through M-Pesa—all in one place.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link to="/register">
            <Button variant="primary">
              Book an Appointment
            </Button>
          </Link>

          <Link to="/about">
            <Button variant="outline">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Landing;