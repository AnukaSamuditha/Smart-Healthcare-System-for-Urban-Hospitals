import { Calendar, Sparkles } from "lucide-react";
import { Outlet } from "react-router";

export default function CreateBooking() {
  return (
    <main className="w-full h-full flex justify-center items-center">
      <div className="w-[75%] h-auto border rounded-xl flex justify-center items-stretch mt-10 rounded-tl-xl rounded-bl-xl">
        <div
          className="bg-white/60 backdrop-blur-xl w-2/3 flex justify-center items-center bg-cover bg-center relative rounded-tl-xl rounded-bl-xl overflow-hidden"
          style={{
            backgroundImage:
              "url('https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?q=80&w=600&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/40 to-transparent" />
          <div className="w-full flex flex-col justify-center items-center absolute right-0 left-0 top-0 bottom-0 border">
            <h1 className="text-3xl font-bold text-white text-left z-100 flex justify-center items-center gap-2">
              <Calendar />
              Book Your Appointment
            </h1>
            <small className="text-xs text-gray-200 text-center w-[80%]">
              Place your booking under this slotComplete this form to schedule
              your consultation. We'll get back to you shortly to confirm
              your booking.
            </small>
            <div className="w-full h-auto flex flex-col justify-center items-center gap-3 mt-5">
              <div className="w-[70%] py-3 px-3 rounded-md bg-white/20 z-10 backdrop-blur-sm">
                <h5 className="font-medium text-white flex justify-start items-center gap-2">
                  <Sparkles className="text-yellow-400 w-4 h-4" />
                  Quick and easy booking process
                </h5>
              </div>

              <div className="w-[70%] py-3 px-3 rounded-md bg-white/20 z-10 backdrop-blur-sm">
                <h5 className="font-medium text-white flex justify-start items-center gap-2">
                  <Sparkles className="text-yellow-400 w-4 h-4" />
                  Instant confimation
                </h5>
              </div>
              <div className="w-[70%] py-3 px-3 rounded-md bg-white/20 z-10 backdrop-blur-sm">
                <h5 className="font-medium text-white flex justify-start items-center gap-2">
                  <Sparkles className="text-yellow-400 w-4 h-4" />
                  Personlized Consultation
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/4 h-full flex justify-start items-center px-4 py-5">
          <Outlet />
        </div>
      </div>
    </main>
  );
}