import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

const statusStyles = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Failed: "bg-red-100 text-red-700",
};

export default function Payments() {
  const { token } = useAuth();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        setError("");

        const authToken = token || localStorage.getItem("access_token");

        const response = await fetch(`${API_BASE}/api/payments`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(data?.message || "Failed to load payments.");
        }

        setPayments(data.payments || []);
      } catch (err) {
        setError(err.message || "Unable to load payments.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [token]);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-400 px-8 py-10 text-white shadow-xl">
        <h1 className="text-4xl font-black">Payment History</h1>
        <p className="mt-4 text-violet-100">
          View all payments made for your appointments.
        </p>
      </section>

      {loading && (
        <Card title="Loading Payments">
          <p className="text-zinc-600">Fetching your payment history...</p>
        </Card>
      )}

      {error && (
        <Card title="Error">
          <p className="text-red-600">{error}</p>
        </Card>
      )}

      {!loading && !error && payments.length === 0 && (
        <Card title="No Payments">
          <p className="text-zinc-600">
            You do not have any payments yet.
          </p>
        </Card>
      )}

      <div className="space-y-6">
        {payments.map((payment) => (
          <Card key={payment.id}>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-zinc-900">
                  {payment.service || "Service"}
                </h2>

                <p className="text-zinc-600">
                  Amount: <span className="font-semibold">KES {payment.amount}</span>
                </p>

                <p className="text-zinc-600">
                  Booking Date: {payment.booking_date || "—"}
                </p>

                <p className="text-zinc-600">
                  Booking Time: {payment.booking_time || "—"}
                </p>

                <p className="text-zinc-600 break-all">
                  Reference:{" "}
                  <span className="font-semibold">{payment.transaction_code}</span>
                </p>
              </div>

              <div className="flex flex-col items-start gap-4 md:items-end">
                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    statusStyles[payment.payment_status] ||
                    "bg-zinc-100 text-zinc-700"
                  }`}
                >
                  {payment.payment_status}
                </span>

                <Button variant="outline" type="button">
                  Download Receipt
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}