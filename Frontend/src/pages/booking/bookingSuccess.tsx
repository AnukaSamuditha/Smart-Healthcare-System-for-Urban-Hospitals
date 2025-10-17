import SuccessIcon from "@/assets/success_icon.png";
import SubmitButton from "@/components/SubmitButton";
import { CircleArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

export default function BookingSuccess() {
  const location = useLocation();
  const bookingData = location.state.bookingData;
  const scheduleID = location.state.scheduleID;
  const navigate = useNavigate();

  return (
    <div className="w-full h-[35rem] flex flex-col justify-center items-center">
      <div>
        <img
          src={SuccessIcon}
          alt="success-icon"
          className="w-15 h-15 object-contain"
        />
      </div>
      <h1 className="text-2xl font-bold text-gray-800 tracking-tight mb-2">
        Booking Confirmed
      </h1>
      <p className="text-gray-600 mb-6 text-center text-sm">
        Your booking has been successfully created. You will receive a
        confirmation email with the details shortly.
      </p>
      <div className="w-[45%] h-auto flex justify-center items-center">
        <SubmitButton
          title="Continue"
          isValid={true}
          icon={<CircleArrowRight size={15} />}
          onClick={() =>
            navigate(`/booking/${bookingData.booking._id}/qrcode`, {
              state: { bookingData, scheduleID },
            })
          }
        />
      </div>
    </div>
  );
}