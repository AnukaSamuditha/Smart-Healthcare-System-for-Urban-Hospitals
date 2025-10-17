import InputField from "@/components/InputField";
import Label from "@/components/Label";
import SubmitButton from "@/components/SubmitButton";
import { useForm } from "react-hook-form";
import { ClockPlus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/providers/axios";
import { useLocation, useNavigate } from "react-router";

export type BookingType = {
  fullName: string;
  email: string;
  phoneNumber: string;
  notes?: string;
};

export default function BookingForm() {
  const location = useLocation();
  const bookingData = location.state;
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState } = useForm<BookingType>({
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      notes: "",
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.post(`/booking`, data);

      return res.data;
    },
    onSuccess: (data) => {
      console.log("Booking created successfully", data);
      navigate(`/booking/${bookingData.slotID}/success`, {
        state: {
          bookingData: data,
          scheduleID: bookingData.scheduleID,
        },
      });
      reset();
    },
    onError: (error) => {
      console.log("Error creating the booking", error);
    },
  });

  const onSubmit = (formData: BookingType) => {
    const data = {
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      notes: formData.notes,
      slotID: bookingData.slotID,
      scheduleID: bookingData.scheduleID,
      hospitalID: bookingData?.hospitalID
    };

    bookingMutation.mutate(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex flex-col justify-center items-start"
    >
      <div className="flex flex-col gap-0.5">
        <h1 className="text-xl font-semibold text-black text-left">
          Create a Booking
        </h1>
        <small className="text-xs text-[#b0b0b0]">
          Place your booking under this slot
        </small>
      </div>

      <div className="w-full h-auto flex flex-col justify-center items-start gap-3 mt-4">
        <div className="w-full flex flex-col justify-start items-start gap-1">
          <Label title="Full Name" name="fullName" />
          <InputField
            name="fullName"
            type="text"
            register={register}
            placeholder="Enter your full name here"
          />
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-1">
          <Label title="Email Address" name="email" />
          <InputField
            name="email"
            type="email"
            register={register}
            placeholder="sampleemail@gmai.com"
          />
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-1">
          <Label title="Telephone" name="phoneNumber" />
          <InputField
            name="phoneNumber"
            type="tel"
            register={register}
            placeholder="0123456789"
          />
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-1">
          <Label title="Additional Notes(Optional)" name="notes" />
          <textarea
            {...register("notes")}
            className={`w-full border border-[#E5E5E5] bg-transparent rounded-[8px] h-[6.5rem]  text-zinc-800 text-sm p-4 placeholder-zinc-400 focus:outline-none`}
          />
        </div>
        <div className="w-full h-auto flex justify-start items-center gap-4">
          <button
            onClick={() => navigate("-1")}
            className="w-full text-sm font-medium rounded-[8px] h-[2.5rem] cursor-pointer bg-gray-100 border-2 border-gray-200"
          >
            Cancel
          </button>
          <SubmitButton
            title="Create"
            isValid={formState.isValid}
            isSubmitting={bookingMutation.isPending}
            icon={<ClockPlus color="white" size={15} />}
          />
        </div>
      </div>
    </form>
  );
}