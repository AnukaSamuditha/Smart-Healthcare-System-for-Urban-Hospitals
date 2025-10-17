import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import Layout from "@/Layout";
import Home from "@/pages/home";
import "@/index.css";
import AuthLayout from "@/pages/auth/AuthLayout";
import SignIn from "@/pages/auth/Signin";
import SignUp from "@/pages/auth/Signup";
import HealthDashboard from "@/pages/HealthDashboard/HealthDashboard.tsx";
import PatientRegistration from "@/pages/PatientRegistrationSystem/PatientRegistration.tsx";
import PatientVisitManagement from "@/pages/PatientVisitManagement/PatientVisitManagement.tsx";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import MyHospitals from "./pages/dashboard/doctor/myHospitals";
import AddHospital from "./pages/dashboard/doctor/addHospital";
import BookingLayout from "@/pages/bookings/BookingLayout";
import CreateBooking from "@/pages/bookings/createBooking";
import BookingSuccess from "@/pages/bookings/bookingSuccess";
import BookingForm from "@/pages/bookings/bookingForm";
import UpdateBooking from "@/pages/bookings/updateBooking";
import BookingQRCode from "@/pages/bookings/bookingQRCode";
import { SidebarProvider } from "./components/ui/sidebar";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="reports" element={<HealthDashboard />} />
          <Route path="registration" element={<PatientRegistration/>}/>
          <Route path="management" element={<PatientVisitManagement/>}/>
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Route>

      <Route
        path="/dashboard"
        element={
          <SidebarProvider>
            <DashboardLayout />
          </SidebarProvider>
        }
      >
        <Route path="/booking" element={<BookingLayout />}>
          <Route path=":id" element={<CreateBooking />}>
            <Route index element={<BookingForm />} />
            <Route path="success" element={<BookingSuccess />} />
            <Route path="edit" element={<UpdateBooking />} />
            <Route path="qrcode" element={<BookingQRCode />} />
          </Route>
        </Route>
        <Route index element={<MyHospitals />} />
        <Route path="add-hospital" element={<AddHospital />} />
      </Route>
    </>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
