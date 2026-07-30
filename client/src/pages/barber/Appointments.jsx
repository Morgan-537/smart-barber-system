import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import useAuth from "../../hooks/useAuth";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

const Appointments = () => {
  const { token } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {
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

      if (response.ok) {
        setAppointments(data.bookings || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadAppointments();
    }
  }, [token]);

  const updateStatus = async (bookingId, status) => {
    try {
      const response = await fetch(
        `${API_BASE}/api/barber/bookings/${bookingId}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      if (response.ok) {
        loadAppointments();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Loader text="Loading appointments..." />;
  }

  return (
    <div className="space-y-8">

      <section className="rounded-3xl bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-400 px-8 py-10 text-white shadow-xl">

        <h1 className="text-4xl font-black">
          Appointment Management
        </h1>

        <p className="mt-4 text-violet-100">
          Manage customer appointments assigned to you.
        </p>

      </section>

      <Card
        title="Appointments"
        subtitle="Approve and complete bookings"
      >

        {appointments.length === 0 ? (

          <p>No appointments assigned.</p>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b">

                  <th className="py-3">Customer</th>
                  <th className="py-3">Service</th>
                  <th className="py-3">Date</th>
                  <th className="py-3">Time</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Action</th>

                </tr>

              </thead>

              <tbody>

                {appointments.map((booking) => (

                  <tr
                    key={booking.id}
                    className="border-b"
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
                          booking.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : booking.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {booking.status}
                      </span>

                    </td>

                    <td className="py-4">

                      {booking.status === "Pending" && (

                        <button
                          onClick={() =>
                            updateStatus(
                              booking.id,
                              "Approved"
                            )
                          }
                          className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                        >
                          Approve
                        </button>

                      )}

                      {booking.status === "Approved" && (

                        <button
                          onClick={() =>
                            updateStatus(
                              booking.id,
                              "Completed"
                            )
                          }
                          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                          Complete
                        </button>

                      )}

                      {booking.status === "Completed" && (

                        <span className="font-semibold text-green-600">
                          ✔ Finished
                        </span>

                      )}

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

export default Appointments;