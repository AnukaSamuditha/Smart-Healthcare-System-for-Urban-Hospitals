import InputField from "@/components/InputField";
import Label from "@/components/Label";
import { hospitalData } from "@/providers/hospitalData";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import type { ScheduleType } from "@/types";
import SubmitButton from "@/components/SubmitButton";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/providers/axios";
import { useLocation, useNavigate } from "react-router";
import processSchedule from "@/utils/processSchedule";
import { Eraser } from "lucide-react";
import HospitalImage from '@/assets/hospital.png';

export default function AddHospital() {
  const { register, handleSubmit, reset, control, watch } =
    useForm<ScheduleType>({
      defaultValues: {
        title: "",
        description: "",
        recurring: "monthly",
        dateRange: {
          from: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          ),
          to: new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            new Date().getDate()
          ),
        },
        weekRange: {
          from: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          ),
          to: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate() + 7
          ),
        },
        openTime: "10:00",
        closeTime: "17:00",
        noOfSlots: 0,
        duration: 30,
      },
    });

  const [recurring, setRecurring] = useState<string>("monthly");
  const [selectedHospitalImage, setSelectedHospitalImage] =
    useState<string>(HospitalImage);
  const [selectedHospital, setSelectedHospital] = useState<string | undefined>(
    ""
  );

  const navigate = useNavigate();
  const location = useLocation();
  const propertyID = location.state?.propertyID;

  const onHospitalSelect = (hospitalID: string) => {
    const selectedHospital = hospitalData?.find(
      (hospital: any) => hospital.id === Number(hospitalID)
    );
    setSelectedHospital(String(selectedHospital?.id));
    setSelectedHospitalImage(selectedHospital?.image ?? "");
  };

  const onRecurringChange = (value: string) => {
    setRecurring(value);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.post("/schedules", data);

      return res;
    },
    onSuccess: (data) => {
      console.log("Schedule created successfully", data);
      navigate(`${data.data.schedule._id}`, { state: { propertyID } });
      reset();
    },
    onError: (error) => {
      console.log("Error occurred in creating schedule! ", error);
    },
  });

  const onSubmit = (formData: any) => {
    const startTime = watch("openTime");
    const endTime = watch("closeTime");
    const range =
      recurring === "weekly" ? formData.weekRange : formData.dateRange;
    const result = processSchedule(
      range,
      startTime,
      endTime,
      Number(formData.duration),
      Number(formData.noOfSlots)
    );
    if (result.length > 0) {
      const data = {
        propertyId: selectedHospital,
        slots: result,
        name: formData.title,
        description: formData.description,
        duration: Number(formData.duration),
        noOfSlots: Number(formData.noOfSlots),
        recurring: recurring,
        dateRange:
          recurring === "weekly" ? formData.weekRange : formData.dateRange,
        openTime: startTime,
        closeTime: endTime,
      };
      mutate(data);
    }
  };

  return (
    <section className="w-full h-full p-4 pt-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:w-full md:w-full w-full flex flex-col justify-center items-start"
      >
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-xl font-semibold text-black text-left">
              Create Schedule
            </h1>
            <small className="text-xs text-[#b0b0b0]">
              Schedule available times for patients
            </small>
          </div>
          <div className="w-15 h-15">
            <img
              src={selectedHospitalImage}
              alt="hospital-icon"
              className="w-full h-full rounded-xs object-cover"
            />
          </div>
        </div>
        <div className="w-full h-auto mt-8 flex flex-col justify-start items-start gap-5">
          <div className="w-full flex flex-col justify-start items-start gap-1">
            <Label title="Select hospital" name="hospital" />
            <Select onValueChange={(value) => onHospitalSelect(String(value))}>
              <SelectTrigger className="w-full text-sm">
                <SelectValue
                  className="text-sm"
                  placeholder="Select the hospital"
                />
              </SelectTrigger>
              <SelectContent className="w-full text-md">
                {hospitalData?.map((hospital) => {
                  return (
                    <SelectItem
                      key={hospital.id}
                      className="text-sm"
                      value={String(hospital.id)}
                    >
                      <img
                        src={hospital.image}
                        alt={String(hospital.id)}
                        className="w-8 h-8 rounded-xs"
                      />
                      <small className="text-sm text-black">
                        {hospital.name}
                      </small>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full flex flex-col justify-start items-start gap-1">
            <Label title="Title" name="title" />
            <InputField
              name="title"
              type="text"
              register={register}
              placeholder="Brief title to describe schedule"
            />
          </div>

          <div className="w-full flex flex-col justify-start items-start gap-1">
            <Label title="Description" name="description" />
            <textarea
              {...register("description")}
              className={`w-full border border-[#E5E5E5] bg-transparent rounded-[8px] h-[6.5rem]  text-zinc-800 text-sm p-4 placeholder-zinc-400 focus:outline-none`}
            />
          </div>

          <div className="w-full flex flex-col justify-start items-start gap-1">
            <Label title="Recurring" name="recurring" />
            <Select onValueChange={(value) => onRecurringChange(value)}>
              <SelectTrigger className="w-full text-sm">
                <SelectValue
                  className="text-sm"
                  placeholder="Select recurring"
                />
              </SelectTrigger>
              <SelectContent className="w-full text-sm">
                <SelectItem className="text-sm" value="weekly">
                  Weekly
                </SelectItem>
                <SelectItem className="text-sm" value="monthly">
                  Monthly
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full flex flex-col justify-center items-start gap-1">
            <Label
              title={`Select ${recurring === "monthly" ? "month" : "week"}`}
              name="month"
            />
            {recurring === "monthly" ? (
              <Controller
                name="dateRange"
                control={control}
                render={({ field }) => (
                  <Calendar
                    mode="range"
                    selected={field.value}
                    onSelect={field.onChange}
                    numberOfMonths={2}
                    defaultMonth={new Date()}
                    max={30}
                    className="w-[60%] shadow-sm rounded-lg border mt-3"
                  />
                )}
              />
            ) : (
              <Controller
                name="weekRange"
                control={control}
                render={({ field }) => (
                  <div className="w-full flex justify-center items-center">
                    <Calendar
                      mode="range"
                      defaultMonth={new Date()}
                      selected={field.value}
                      onSelect={field.onChange}
                      max={7}
                      className="shadow-sm rounded-lg border mt-3"
                    />
                  </div>
                )}
              />
            )}
          </div>

          <div className="mt-5 flex flex-col justify-start items-start gap-1">
            <h1 className="text-md font-semibold text-black text-left">
              Configure Day
            </h1>
            <small className="text-xs text-[#b0b0b0]">
              Setup how a day should be
            </small>
          </div>
          <div className="w-full flex justify-between items-start gap-5">
            <div className="w-1/2 flex flex-col justify-center items-start gap-2">
              <Label title="Slots" name="timeBlocksPerDay" />
              <InputField
                type="number"
                placeholder="Time slots per day"
                name="noOfSlots"
                register={register}
              />
            </div>

            <div className="w-1/2 flex flex-col justify-center items-start gap-2">
              <Label title="Duration" name="durationTimeBlock" />
              <InputField
                type="number"
                placeholder="30 Minutes"
                name="duration"
                register={register}
              />
            </div>
          </div>

          <div className="w-full flex justify-between items-start gap-5">
            <div className="w-1/2 flex flex-col justify-center items-start gap-2">
              <Label title="Start time" name="openTime" />
              <InputField
                type="time"
                placeholder="Start time"
                name="openTime"
                register={register}
                styles="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>

            <div className="w-1/2 flex flex-col justify-center items-start gap-2">
              <Label title="End time" name="closeTime" />
              <InputField
                type="time"
                placeholder="End time"
                name="closeTime"
                register={register}
                styles="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>
          </div>
          <div className="w-full flex justify-start items-center gap-6">
            <div>
              <button className="className={`w-full text-sm font-medium rounded-[8px] h-[2.5rem] cursor-pointer flex justify-center items-center gap-2 px-4 py-2">
                <Eraser color="black" size={18}/>Clear
              </button>
            </div>
            <div className="w-[20%]">
              <SubmitButton
                title="Create schedule"
                isValid={true}
                isSubmitting={isPending}
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
