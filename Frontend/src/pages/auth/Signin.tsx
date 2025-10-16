import Label from "@/components/Label";
import InputField from "@/components/InputField";
import SubmitButton from "@/components/SubmitButton";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from '@/providers/axios.js'
import { useLocation, useNavigate } from "react-router";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password cannot be more than 16 characters"),
});

export default function SignIn() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ resolver: zodResolver(schema), mode: "onChange" });

  const navigate = useNavigate();
  const location = useLocation();
  const redirectedFrom = location.state || undefined;
  const queryClient = useQueryClient();

  const { mutate,error } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post(
        `/users/login`,
        data
      );
      return res.data;
    },
    onSuccess: (res) => {
      console.log("User were logged in sucessfully", res);
      reset();
      queryClient.invalidateQueries({queryKey:["user_self",res.data]})
      redirectedFrom ? navigate(redirectedFrom) : navigate("/");
      
    },
    onError: (error) => {
      console.log("Error in logging the user", error);
      
    },
  });

  const onSubmit = (formData:any) => {
    mutate(formData);
  };

  if(error){
    console.log(error.message)
  }
  return (
    <div className="w-full h-screen flex justify-center items-center bg-white mb-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-lg:w-[90%] lg:w-[30%] md:w-[30%] h-auto flex flex-col mt-20 gap-4 rounded-xl border border-[#E5E5E5] px-5 py-5"
      >
        <div className="flex flex-col">
          <h5 className="text-black text-2xl font-semibold text-left mb-1">
            SignIn
          </h5>
          <h5 className="text-zinc-400 text-xs mb-3">
            Enter your credentials to logged in!
          </h5>
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

        <SubmitButton
          title="Login"
          isSubmitting={isSubmitting}
          isValid={isValid}
        />
        <p onClick={()=>navigate("/auth/signup")} className="text-xs text-center text-black cursor-pointer">
          Don't have an account? <span className="underline">Create one</span>
        </p>
      </form>
    </div>
  );
}