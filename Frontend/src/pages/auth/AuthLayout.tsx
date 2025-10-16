import { Outlet, useNavigate } from "react-router";
import { ArrowLeftCircle } from "lucide-react";

export default function AuthLayout() {
  const navigate = useNavigate();
  return (
    <main>
      <header className="w-full h-12 p-4">
        <button
          onClick={() => navigate(-1)}
          className="flex gap-3 text-xs justify-center items-center"
        >
          <ArrowLeftCircle color="black" size={18} />
          Back to home
        </button>
      </header>
      <Outlet />
    </main>
  );
}