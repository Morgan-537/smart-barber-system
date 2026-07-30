import { useEffect, useState } from "react";

import Card from "../../components/Card";
import Button from "../../components/Button";

const API =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:5000";

export default function Services() {
  const token =
    localStorage.getItem("access_token") ||
    localStorage.getItem("token");

  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    duration: "",
    price: "",
    is_available: true,
  });

  const loadServices = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API}/api/admin/services`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setServices(data);
        } else if (Array.isArray(data.services)) {
        setServices(data.services);
        } else {
        setServices([]);
        }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const clearForm = () => {
    setEditingId(null);

    setForm({
      name: "",
      description: "",
      duration: "",
      price: "",
      is_available: true,
    });
  };

  const saveService = async () => {
    const url = editingId
      ? `${API}/api/admin/services/${editingId}`
      : `${API}/api/admin/services`;

    const method = editingId
      ? "PATCH"
      : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message);
      return;
    }

    clearForm();

    loadServices();
  };

  const editService = (service) => {
    setEditingId(service.id);

    setForm({
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price,
      is_available: service.is_available,
    });
  };

  const deleteService = async (id) => {
    if (!confirm("Delete this service?")) {
      return;
    }

    await fetch(
      `${API}/api/admin/services/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    loadServices();
  };

  return (
    <div className="space-y-8">

      <section className="rounded-3xl bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-400 px-8 py-10 text-white shadow-xl">

        <h1 className="text-4xl font-black">
          Services Management
        </h1>

        <p className="mt-3 text-violet-100">
          Create, update and manage barbershop services.
        </p>

      </section>

      <Card>

        <div className="grid gap-5 md:grid-cols-2">

          <input
            className="rounded-xl border p-3"
            placeholder="Service name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            className="rounded-xl border p-3"
            placeholder="Duration (minutes)"
            value={form.duration}
            onChange={(e) =>
              setForm({
                ...form,
                duration: e.target.value,
              })
            }
          />

          <input
            className="rounded-xl border p-3"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value,
              })
            }
          />

          <select
            className="rounded-xl border p-3"
            value={form.is_available}
            onChange={(e) =>
              setForm({
                ...form,
                is_available:
                  e.target.value === "true",
              })
            }
          >
            <option value={true}>
              Available
            </option>

            <option value={false}>
              Unavailable
            </option>
          </select>

        </div>

        <textarea
          className="mt-5 w-full rounded-xl border p-3"
          rows="4"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <div className="mt-6 flex gap-4">

          <Button onClick={saveService}>
            {editingId
              ? "Update Service"
              : "Create Service"}
          </Button>

          <Button
            variant="outline"
            onClick={clearForm}
          >
            Clear
          </Button>

        </div>

      </Card>

      <Card>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th>Name</th>

                <th>Duration</th>

                <th>Price</th>

                <th>Status</th>

                <th></th>

              </tr>

            </thead>

            <tbody>

              {services.map((service) => (

                <tr
                  key={service.id}
                  className="border-b"
                >

                  <td>{service.name}</td>

                  <td>
                    {service.duration} mins
                  </td>

                  <td>
                    KES {service.price}
                  </td>

                  <td>
                    {service.is_available
                      ? "Available"
                      : "Unavailable"}
                  </td>

                  <td className="space-x-3">

                    <button
                      className="text-violet-700"
                      onClick={() =>
                        editService(service)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="text-red-600"
                      onClick={() =>
                        deleteService(service.id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        )}

      </Card>

    </div>
  );
}