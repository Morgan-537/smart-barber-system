import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/Card";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

const BookAppointment = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    barber_id: "",
    service_id: "",
    booking_date: "",
    booking_time: "",
    notes: "",
  });

  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [optionsError, setOptionsError] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setOptionsLoading(true);
        setOptionsError("");

        const authToken =
          token || localStorage.getItem("access_token");

        if (!authToken) {
          throw new Error("You are not authenticated.");
        }

        const response = await fetch(
          `${API_BASE}/api/bookings/options`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            data?.message || "Unable to load booking options."
          );
        }

        setBarbers(data.barbers || []);
        setServices(data.services || []);
      } catch (err) {
        setOptionsError(
          err.message || "Unable to load booking options."
        );
      } finally {
        setOptionsLoading(false);
      }
    };

    fetchOptions();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const authToken =
        token || localStorage.getItem("access_token");

      const response = await fetch(`${API_BASE}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          barber_id: Number(formData.barber_id),
          service_id: Number(formData.service_id),
          booking_date: formData.booking_date,
          booking_time: formData.booking_time,
          notes: formData.notes,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data?.message || data?.msg || "Unable to create booking."
        );
      }

      setSuccess("Appointment booked successfully.");

      setFormData({
        barber_id: "",
        service_id: "",
        booking_date: "",
        booking_time: "",
        notes: "",
      });

      setTimeout(() => {
        navigate("/customer/appointments", { replace: true });
      }, 1000);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (optionsLoading) {
    return (
      <div className="space-y-8">
        <section className="rounded-3xl bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-400 px-8 py-10 text-white shadow-xl">
          <h1 className="text-4xl font-black">Book Appointment</h1>
          <p className="mt-4 text-violet-100">
            Choose your preferred barber, service, date, and time.
          </p>
        </section>

        <Card title="Loading Booking Form">
          <p className="text-zinc-600">Loading booking options...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-400 px-8 py-10 text-white shadow-xl">
        <h1 className="text-4xl font-black">Book Appointment</h1>
        <p className="mt-4 max-w-2xl text-violet-100">
          Choose your preferred barber, service, date, and time.
        </p>
      </section>

      {optionsError && (
        <Card title="Warning">
          <p className="text-red-600">{optionsError}</p>
        </Card>
      )}

      <Card
        title="Appointment Details"
        subtitle="Fill in the form below to confirm your booking."
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          <div>
            <label className="mb-2 block font-semibold text-zinc-700">
              Barber
            </label>

            <select
              name="barber_id"
              value={formData.barber_id}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-violet-100 bg-white p-4 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
            >
              <option value="">Select Barber</option>

              {barbers.map((barber) => (
                <option key={barber.id} value={barber.id}>
                  {barber.full_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block font-semibold text-zinc-700">
              Service
            </label>

            <select
              name="service_id"
              value={formData.service_id}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-violet-100 bg-white p-4 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
            >
              <option value="">Select Service</option>

              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} — KES {service.price}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-semibold text-zinc-700">
                Date
              </label>

              <input
                type="date"
                name="booking_date"
                value={formData.booking_date}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-violet-100 bg-white p-4 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-zinc-700">
                Time
              </label>

              <input
                type="time"
                name="booking_time"
                value={formData.booking_time}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-violet-100 bg-white p-4 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-semibold text-zinc-700">
              Notes
            </label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              placeholder="Any special instructions for the barber?"
              className="w-full rounded-xl border border-violet-100 bg-white p-4 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Confirming..." : "Confirm Appointment"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default BookAppointment;