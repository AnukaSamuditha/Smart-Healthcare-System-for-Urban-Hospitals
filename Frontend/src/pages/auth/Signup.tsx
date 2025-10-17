import Label from "@/components/Label";
import InputField from "@/components/InputField";
import SubmitButton from "@/components/SubmitButton";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/providers/axios";
import { useNavigate } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  username: z
    .string()
    .min(4, "Username must be at least 4 characters")
    .max(10, "Username cannot be more than 10 characters"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password cannot be more than 16 characters"),
  role: z.enum(["patient", "doctor"]).default("patient"),
});

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ resolver: zodResolver(schema), mode: "onChange" });

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post(`/users/signup`, data);
      return res;
    },
    onSuccess: (res) => {
      console.log("User has been created sucessfully", res);
      console.log(res.data.user);
      navigate("/auth/signin");
    },
    onError: (error) => {
      console.log("Error in creating the user", error);
      reset();
    },
  });

  const onSubmit = (formData: any) => {
    mutate(formData);
  };
  return (
    <div className="w-full h-auto flex justify-center items-center bg-white pt-8 mb-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-lg:w-[90%] lg:w-[30%] md:w-[30%] h-auto flex flex-col mt-20 gap-4 rounded-xl border border-[#E5E5E5] px-5 py-5 mb-20"
      >
        <div className="flex flex-col">
          <h5 className="text-black text-2xl font-semibold text-left mb-1">
            Signup
          </h5>
          <h5 className="text-zinc-400 text-xs mb-3">
            Enter your details to get started!
          </h5>
        </div>

        <div className="w-full flex flex-col gap-1">
          <Label name="username" title="Username" />
          <InputField
            type="text"
            name="username"
            placeholder="Enter unique username"
            register={register}
            error={errors.username}
          />
        </div>

        <div className="w-full flex flex-col gap-1">
          <Label name="email" title="Email" />
          <InputField
            type="email"
            name="email"
            placeholder="xxxxx@email.com"
            register={register}
            error={errors.email}
          />
        </div>

        <div className="w-full flex flex-col gap-1">
          <Label name="password" title="Password" />
          <InputField
            type="password"
            name="password"
            placeholder="*******"
            register={register}
            error={errors.password}
          />
        </div>

        <div className="w-full flex flex-col gap-1">
          <Label name="Type" title="Type" />
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full h-[2.5rem] p-4">
                    <SelectValue placeholder="Patient" />
                  </SelectTrigger>
                  <SelectContent className="w-full h-full">
                    <SelectItem value="patient">Patient</SelectItem>
                    <SelectItem value="doctor">Doctor</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <small className="text-xs text-red-600 font-medium">
                    {errors.role.message}
                  </small>
                )}
              </>
            )}
          />
        </div>

        <SubmitButton
          title="Submit"
          isSubmitting={isSubmitting}
          isValid={isValid}
        />
        <p
          onClick={() => navigate("/login")}
          className="text-xs text-center text-black cursor-pointer"
        >
          Already have an account? <span className="underline">Log in</span>
        </p>
      </form>
    </div>
  );
}
