import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:5000";

export default function AdminBookings() {

  const { token } = useAuth();

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchBookings = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        `${API_BASE}/api/admin/bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to load bookings."
        );
      }

      setBookings(data.bookings || []);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchBookings();

  }, []);

  const updateStatus = async (id, status) => {

    try {

      const response = await fetch(
        `${API_BASE}/api/admin/bookings/${id}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":"application/json",

            Authorization:`Bearer ${token}`,
          },

          body:JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if(!response.ok){

        throw new Error(data.message);

      }

      fetchBookings();

    } catch(err){

      alert(err.message);

    }

  };

  const badge=(status)=>{

    switch(status){

      case "Pending":

        return "bg-yellow-100 text-yellow-700";

      case "Approved":

        return "bg-blue-100 text-blue-700";

      case "Completed":

        return "bg-green-100 text-green-700";

      case "Cancelled":

        return "bg-red-100 text-red-700";

      default:

        return "bg-zinc-100";
    }

  };

  return (

    <div className="space-y-8">

      <Card
        title="Booking Management"
        subtitle="Approve, reject and complete appointments."
      >

        {loading && <p>Loading...</p>}

        {error && (
          <p className="text-red-600">
            {error}
          </p>
        )}

        {!loading && (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="py-3 text-left">
                    Customer
                  </th>

                  <th className="text-left">
                    Barber
                  </th>

                  <th className="text-left">
                    Service
                  </th>

                  <th className="text-left">
                    Date
                  </th>

                  <th className="text-left">
                    Status
                  </th>

                  <th className="text-left">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {bookings.map((booking)=>(

                  <tr
                    key={booking.id}
                    className="border-b"
                  >

                    <td className="py-4">

                      {booking.customer}

                    </td>

                    <td>

                      {booking.barber}

                    </td>

                    <td>

                      {booking.service}

                    </td>

                    <td>

                      {booking.booking_date}

                    </td>

                    <td>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${badge(
                          booking.status
                        )}`}
                      >

                        {booking.status}

                      </span>

                    </td>

                    <td>

                      <div className="flex gap-2">

                        {booking.status==="Pending" && (

                          <>

                            <Button
                              onClick={()=>updateStatus(
                                booking.id,
                                "Approved"
                              )}
                            >

                              Approve

                            </Button>

                            <Button
                              variant="danger"
                              onClick={()=>updateStatus(
                                booking.id,
                                "Cancelled"
                              )}
                            >

                              Reject

                            </Button>

                          </>

                        )}

                        {booking.status==="Approved" && (

                          <Button
                            onClick={()=>updateStatus(
                              booking.id,
                              "Completed"
                            )}
                          >

                            Complete

                          </Button>

                        )}

                      </div>

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