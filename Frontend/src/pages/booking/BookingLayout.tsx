import { Outlet, useNavigate } from "react-router";
import { ArrowLeftCircle } from "lucide-react";

export default function BookingLayout() {
  const navigate = useNavigate();

  return (
    <main>
      <header className="w-full h-12 p-4">
        <button
          onClick={() => navigate(-1)}
          className="flex gap-3 text-sm justify-center items-center"
        >
          <ArrowLeftCircle color="black" size={18} />
          Go back
        </button>
      </header>
      <Outlet />
    </main>
  );
}