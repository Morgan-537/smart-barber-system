import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import AdminTable from "../components/AdminTable";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem("access_token") ||
      localStorage.getItem("token");

    fetch("/api/admin/services", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setServices(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-gradient-to-r from-purple-700 via-purple-600 to-amber-400 p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-white">
          Service Management
        </h1>

        <p className="mt-3 max-w-2xl text-purple-100">
          View and manage every service offered by the Smart Barber System.
        </p>
      </div>

      <AdminTable
        title="Available Services"
        subtitle="Current services offered"
        columns={[
          "Service",
          "Duration",
          "Price",
          "Availability",
        ]}
      >
        {services.map((service) => (
          <tr
            key={service.id}
            className="border-b border-zinc-800 transition hover:bg-purple-900/20"
          >
            <td className="px-6 py-4 font-medium text-white">
              {service.name}
            </td>

            <td className="px-6 py-4 text-zinc-300">
              {service.duration} mins
            </td>

            <td className="px-6 py-4 font-semibold text-amber-300">
              KES {service.price}
            </td>

            <td className="px-6 py-4">
              {service.is_available ? (
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                  Available
                </span>
              ) : (
                <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-400">
                  Unavailable
                </span>
              )}
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
};

export default Services;