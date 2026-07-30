import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, Eye, EyeOff } from "lucide-react";

import Button from "../../components/Button";
import Card from "../../components/Card";
import { useAuth } from "../../context/AuthContext";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.msg ||
            "Login failed"
        );
      }

      const token =
        data.access_token || data.token;

      const user =
        data.user ||
        data.data?.user ||
        null;

      if (!token || !user) {
        throw new Error(
          "Invalid response from server."
        );
      }

      // Let AuthContext manage everything
      login(user, token);

      switch (user.role) {
        case "admin":
          navigate("/admin/dashboard", {
            replace: true,
          });
          break;

        case "customer":
          navigate("/customer/dashboard", {
            replace: true,
          });
          break;

        case "barber":
          navigate("/barber/dashboard", {
            replace: true,
          });
          break;

        default:
          navigate("/", {
            replace: true,
          });
      }
    } catch (err) {
      setError(
        err.message || "Unable to login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-140px)] max-w-7xl items-center px-8 py-12 lg:grid-cols-2">

      <div className="max-w-xl">

        <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
          Welcome Back
        </span>

        <h1 className="mt-8 text-5xl font-black leading-tight text-zinc-900">
          Sign in to your
          <span className="block text-violet-700">
            SMARTBARBER account
          </span>
        </h1>

        <p className="mt-6 text-lg leading-8 text-zinc-600">
          Access your appointments, payments,
          notifications and dashboard in one place.
        </p>

      </div>

      <Card className="mx-auto w-full max-w-xl">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
              {error}
            </div>
          )}

          <div>

            <label className="mb-2 block font-semibold text-zinc-700">
              Email
            </label>

            <div className="relative">

              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                size={18}
              />

              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-violet-100 py-4 pl-12 pr-4 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block font-semibold text-zinc-700">
              Password
            </label>

            <div className="relative">

              <LockKeyhole
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                size={18}
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full rounded-xl border border-violet-100 py-4 pl-12 pr-12 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-violet-700"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          <label className="flex items-center gap-2 text-sm text-zinc-600">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            Remember me
          </label>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </Button>

          <p className="text-center text-sm text-zinc-600">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="font-semibold text-violet-700 hover:underline"
            >
              Create one
            </Link>

          </p>

        </form>

      </Card>

    </div>
  );
};

export default Login;