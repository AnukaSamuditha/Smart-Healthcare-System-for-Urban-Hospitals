import InputField from "@/components/InputField";
import Label from "@/components/Label";
import SubmitButton from "@/components/SubmitButton";
import { useForm } from "react-hook-form";
import { ClockPlus, TicketX } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/providers/axios";
import { useLocation, useNavigate } from "react-router";
import type { BookingType } from "@/pages/bookings/bookingForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const schema = z.object({
  email: z.email("Invalid email address"),
  fullName: z
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(40, "Password cannot be more than 40 characters"),
  phoneNumber: z
    .string()
    .min(10, "Telephone must be at least 10 characters")
    .max(15, "Telephone cannot be more than 15 characters"),
  notes: z.string().optional(),
});

export default function UpdateBooking() {
  const location = useLocation();
  const bookingData = location.state?.bookingData?.booking;
  const scheduleID = location.state.scheduleID;
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState } = useForm<BookingType>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      fullName: bookingData?.fullName,
      email: bookingData?.email,
      phoneNumber: bookingData?.phoneNumber,
      notes: bookingData?.notes,
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.patch(
        `/booking/${bookingData?._id}`,
        data
      );

      return res.data;
    },
    onSuccess: (data) => {
      console.log("Booking updated successfully", data);
      toast.success("Booking updated successfully", {
        description: `${new Date().toLocaleDateString("en-US", {
          weekday: "long",
        })}, ${new Date().toLocaleDateString("en-US", { month: "long" })} 
        ${new Date().getDay()} at ${new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        })}
        `,
      });
      navigate(`/schedule/${scheduleID}`);
      reset();
    },
    onError: (error) => {
      console.log("Error updating the booking", error);
    },
  });

  const bookingDeleteMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.delete(`/booking/${bookingData._id}`);

      return res.data;
    },
    onSuccess: (data) => {
      console.log("Booking is cancelled successfully", data);
      toast.success("Booking cancelled successfully", {
        description: `${new Date().toLocaleDateString("en-US", {
          weekday: "long",
        })}, ${new Date().toLocaleDateString("en-US", { month: "long" })} 
        ${new Date().getDay()} at ${new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        })}
        `,
      });
      navigate(`/schedule/${scheduleID}`);
    },
    onError: (error) => {
      console.log("Error deleting the booking", error);
    },
  });

  const onSubmit = (formData: BookingType) => {
    const data = {
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      notes: formData.notes,
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
          Edit Booking
        </h1>
        <small className="text-xs text-[#b0b0b0]">
          Provide the latest details to the booking
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
            error={formState.errors.fullName}
          />
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-1">
          <Label title="Email Address" name="email" />
          <InputField
            name="email"
            type="email"
            register={register}
            placeholder="sampleemail@gmai.com"
            error={formState.errors.email}
          />
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-1">
          <Label title="Telephone" name="phoneNumber" />
          <InputField
            name="phoneNumber"
            type="tel"
            register={register}
            placeholder="0123456789"
            error={formState.errors.phoneNumber}
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
          <AlertDialog>
            <AlertDialogTrigger className="w-full text-sm text-gray-800 font-medium rounded-[8px] h-[2.5rem] flex justify-center items-center gap-1 cursor-pointer bg-red-200 border-2 border-red-300 drop-shadow-md">
              Cancel Booking <TicketX size={15} className="text-gray-800" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your schedule and remove your schedule data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    bookingDeleteMutation.mutate();
                  }}
                  className="bg-red-500"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <SubmitButton
            title="Update"
            isValid={formState.isValid}
            isSubmitting={bookingMutation.isPending}
            styles="drop-shadow-md border-2 border-gray-800"
            icon={<ClockPlus color="white" size={15} />}
          />
        </div>
      </div>
    </form>
  );
}