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
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import MyHospitals from "./pages/dashboard/doctor/myHospitals";
import AddHospital from "./pages/dashboard/doctor/addHospital";
import { SidebarProvider } from "./components/ui/sidebar";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
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
        <Route index element={<MyHospitals />} />
        <Route path="add-hospital" element={<AddHospital />} />
      </Route>
    </>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
