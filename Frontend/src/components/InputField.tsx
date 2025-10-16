import type { InputFieldProps } from "../types";



export default function InputField({
  name,
  type,
  styles,
  value,
  placeholder,
  register,
  error,
  step,
  defaultValue
}: InputFieldProps) {
  return (
    <div className="w-full h-auto">
      <input
        type={type}
        value={value}
        className={`w-full border border-[#E5E5E5] bg-transparent rounded-[8px] h-[2.5rem]  text-zinc-800 text-sm p-4 placeholder-zinc-400 ${styles} focus:outline-none`}
        placeholder={placeholder}
        {...register(name)}
        step={step}
        defaultValue={defaultValue}
        min={type==="number" ? 1 : undefined}
      />
      {error && (
        <small className="text-xs text-red-600 font-medium">
          {error.message}
        </small>
      )}
    </div>
  );
}