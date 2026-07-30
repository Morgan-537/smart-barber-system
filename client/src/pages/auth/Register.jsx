import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserPlus,
  User,
  Mail,
  Phone,
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";

import Button from "../../components/Button";
import Card from "../../components/Card";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: "customer",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || data?.msg || "Registration failed");
      }

      navigate("/login", {
        replace: true,
        state: { success: "Account created successfully. Please log in." },
      });
    } catch (err) {
      setError(err.message || "Unable to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-140px)] max-w-7xl items-center px-8 py-12 lg:grid-cols-2">
      <div className="max-w-xl">
        <span className="inline-flex items-center rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
          Create Your Account
        </span>

        <h1 className="mt-8 text-5xl font-black leading-tight text-zinc-900">
          Join the
          <span className="block text-violet-700">SMARTBARBER experience</span>
        </h1>

        <p className="mt-6 text-lg leading-8 text-zinc-600">
          Book appointments faster, receive reminders, and manage your grooming
          journey from one modern platform.
        </p>
      </div>

      <Card className="mx-auto w-full max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-700">
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                size={18}
              />
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full rounded-xl border border-violet-100 bg-white py-4 pl-12 pr-4 text-zinc-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-700">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                size={18}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-violet-100 bg-white py-4 pl-12 pr-4 text-zinc-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-700">
              Phone Number
            </label>
            <div className="relative">
              <Phone
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                size={18}
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="07XXXXXXXX"
                className="w-full rounded-xl border border-violet-100 bg-white py-4 pl-12 pr-4 text-zinc-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-700">
              Password
            </label>
            <div className="relative">
              <LockKeyhole
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a password"
                className="w-full rounded-xl border border-violet-100 bg-white py-4 pl-12 pr-12 text-zinc-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-violet-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-700">
              Confirm Password
            </label>
            <div className="relative">
              <LockKeyhole
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                size={18}
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
                placeholder="Repeat your password"
                className="w-full rounded-xl border border-violet-100 bg-white py-4 pl-12 pr-12 text-zinc-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-violet-700"
                aria-label={
                  showConfirmPassword ? "Hide confirm password" : "Show confirm password"
                }
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-zinc-700">
            <span className="font-semibold text-amber-700">Account type:</span>{" "}
            Customer
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              "Creating Account..."
            ) : (
              <span className="inline-flex items-center gap-2">
                <UserPlus size={18} />
                Create Account
              </span>
            )}
          </Button>

          <p className="text-center text-sm text-zinc-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-violet-700 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Register;