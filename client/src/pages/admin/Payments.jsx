import React, { useEffect, useMemo, useState } from "react";
import Card from "../../components/Card";
import useAuth from "../../hooks/useAuth";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

export default function Payments() {
  const { token } = useAuth();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        setError("");

        const authToken = token || localStorage.getItem("access_token");

        const response = await fetch(`${API_BASE}/api/admin/payments`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(data?.message || "Unable to load payments.");
        }

        setPayments(Array.isArray(data) ? data : data.payments || []);
      } catch (err) {
        setError(err.message || "Unable to load payments.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [token]);

  const filteredPayments = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return payments;

    return payments.filter((payment) => {
      const haystack = [
        payment.id,
        payment.booking_id,
        payment.amount,
        payment.payment_method,
        payment.payment_status,
        payment.transaction_code,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [payments, search]);

  const paidCount = payments.filter(
    (payment) => payment.payment_status === "Paid"
  ).length;

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-400 px-8 py-10 text-white shadow-xl">
        <h1 className="text-4xl font-black">Payments</h1>
        <p className="mt-4 text-violet-100">
          Monitor payments processed through the platform.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <Card>
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Total Payments
          </p>
          <h2 className="mt-2 text-4xl font-black text-zinc-900">
            {payments.length}
          </h2>
        </Card>

        <Card>
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Paid
          </p>
          <h2 className="mt-2 text-4xl font-black text-zinc-900">
            {paidCount}
          </h2>
        </Card>

        <Card>
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Search
          </p>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search payment..."
            className="mt-3 w-full rounded-xl border border-violet-100 p-3 outline-none transition focus:border-violet-500"
          />
        </Card>
      </section>

      {loading && (
        <Card title="Loading Payments">
          <p className="text-zinc-600">Fetching payment records...</p>
        </Card>
      )}

      {error && (
        <Card title="Error">
          <p className="text-red-600">{error}</p>
        </Card>
      )}

      {!loading && !error && filteredPayments.length === 0 && (
        <Card title="No Payments">
          <p className="text-zinc-600">No payments found.</p>
        </Card>
      )}

      {!loading && !error && filteredPayments.length > 0 && (
        <Card title="Payment Records" subtitle="All recorded transactions">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-zinc-200 text-zinc-500">
                <tr>
                  <th className="py-3 pr-4">ID</th>
                  <th className="py-3 pr-4">Booking ID</th>
                  <th className="py-3 pr-4">Amount</th>
                  <th className="py-3 pr-4">Method</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3 pr-4">Reference</th>
                </tr>
              </thead>

              <tbody>
                {filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-zinc-100 last:border-0"
                  >
                    <td className="py-4 pr-4 font-medium text-zinc-900">
                      {payment.id}
                    </td>
                    <td className="py-4 pr-4 text-zinc-700">
                      {payment.booking_id}
                    </td>
                    <td className="py-4 pr-4 text-zinc-700">
                      KES {Number(payment.amount).toFixed(2)}
                    </td>
                    <td className="py-4 pr-4 text-zinc-700">
                      {payment.payment_method}
                    </td>
                    <td className="py-4 pr-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${
                          payment.payment_status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : payment.payment_status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {payment.payment_status}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-zinc-700 break-all">
                      {payment.transaction_code || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}