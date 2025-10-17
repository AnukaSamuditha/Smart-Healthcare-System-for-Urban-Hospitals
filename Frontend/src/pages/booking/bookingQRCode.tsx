import SubmitButton from "@/components/SubmitButton";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import axiosInstance from "@/providers/axios";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeftCircle,
  DownloadIcon,
  EditIcon,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";

export default function BookingQRCode() {
  const navigate = useNavigate()
  const location = useLocation();
  const bookingData = location.state.bookingData;
  const scheduleID = location.state.scheduleID;

  const bookingQuery: any = useQuery({
    queryKey: ["schedule", bookingData?.booking?._id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      const res = await axiosInstance.get(`/booking/qr/${id}`);
      console.log("qr code", res.data);
      return res.data;
    },
    enabled: !!bookingData?.booking?._id,
  });

  console.log("qrrr", bookingData?.booking?._id);

  return (
    <div className="w-full h-[35rem] flex justify-start items-start">
      <div className="w-full h-full flex flex-col justify-start items-start gap-4">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
            Your Booking QR Code
          </h1>
          <a
            href={bookingQuery?.data?.QRCode}
            download={`booking-${bookingData?.booking?._id}.png`}
            className="px-3 py-1 rounded-[8px] border-2 border-gray-300 text-gray-400 text-xs font-medium flex justify-center items-center gap-1 cursor-pointer"
          >
            Download
            <DownloadIcon size={15} />
          </a>
        </div>
        <div className="relative w-full h-[95%] flex flex-col justify-start items-center">
          <div className="w-[15rem] h-[15rem] flex justify-start items-start mb-5 mt-10">
            {bookingQuery.isFetched ? (
              <img
                src={bookingQuery?.data?.QRCode}
                alt="qr-code"
                className="w-full h-full object-cover"
              />
            ) : (
              <Spinner variant="default" size={17} className="text-gray-800" />
            )}
          </div>
          {bookingQuery.isFetched && (
            <small className="w-[90%] text-xs text-center font-normal text-gray-400 leading-relaxed mt-5">
              This QR code will be used to validate your booking when you visit
              the doctor. A confirmation email containing this QR code has
              also been sent to your provided email address.
            </small>
          )}
          <div className="absolute bottom-1 w-full flex justify-center items-center gap-5">
            <button onClick={()=>navigate(`/schedule/${scheduleID}`)} className="w-full text-sm text-gray-600 font-medium rounded-[8px] h-[2.5rem] flex justify-center items-center gap-1 cursor-pointer bg-gray-200 border-2 border-gray-300 drop-shadow-md">
              <ArrowLeftCircle size={15} className="text-gray-600" /> Back to
              Schedule
            </button>
            <SubmitButton
              title="Update"
              isValid={true}
              styles="drop-shadow-md border-2 border-gray-800"
              icon={<EditIcon size={15} color="white" />}
              onClick={()=>navigate(`/booking/${bookingData?.booking?._id}/edit`,{state:{bookingData,scheduleID}})}
            />
          </div>
        </div>
      </div>
    </div>
  );
}