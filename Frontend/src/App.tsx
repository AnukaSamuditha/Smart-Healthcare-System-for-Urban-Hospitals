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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="health-reports" element={<HealthDashboard />} />
          <Route path="registration" element={<PatientRegistration/>}/>
          <Route path="management" element={<PatientVisitManagement/>}/>
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
    </>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
