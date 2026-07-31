import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import Landing from "./pages/Landing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Reviews from "./pages/Reviews";
import NotFound from "./pages/NotFound";

// Authentication
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Admin
import AdminDashboard from "./pages/admin/Dashboard";
import Services from "./pages/admin/Services";
import AdminPayments from "./pages/admin/Payments";
import Users from "./pages/admin/Users";
import Bookings from "./pages/admin/Bookings";

// Customer
import CustomerDashboard from "./pages/customer/Dashboard";
import BookAppointment from "./pages/customer/BookAppointment";
import MyAppointments from "./pages/customer/MyAppointments";
import Payments from "./pages/customer/Payments";
import Notifications from "./pages/customer/Notifications";
import Profile from "./pages/customer/Profile";

// Barber
import BarberDashboard from "./pages/barber/Dashboard";
import BarberAppointments from "./pages/barber/Appointments";
import BarberSchedule from "./pages/barber/Schedule";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ---------------- PUBLIC LAYOUT ---------------- */}
        <Route element={<MainLayout />}>

          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ---------------- CUSTOMER ---------------- */}

          <Route
            path="/customer/dashboard"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/customer/book"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <BookAppointment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/customer/appointments"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <MyAppointments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/customer/payments"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Payments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/customer/notifications"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Notifications />
              </ProtectedRoute>
            }
          />

          <Route
            path="/customer/profile"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* ---------------- ADMIN ---------------- */}

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin/services"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Services />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Users />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/bookings"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Bookings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/payments"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminPayments />
              </ProtectedRoute>
            }
          />

          {/*-----------------Barber----------------*/}
          
          <Route
            path="/barber/dashboard"
            element={
              <ProtectedRoute allowedRoles={["barber"]}>
                <BarberDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/barber/appointments"
            element={
              <ProtectedRoute allowedRoles={["barber"]}>
                <BarberAppointments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/barber/schedule"
            element={
              <ProtectedRoute allowedRoles={["barber"]}>
                <BarberSchedule />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ---------------- 404 ---------------- */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;