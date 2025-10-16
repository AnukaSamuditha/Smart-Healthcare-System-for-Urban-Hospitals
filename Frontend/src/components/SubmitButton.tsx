import { type SubmitButtonProps } from "@/types";

export default function SubmitButton({
  title,
  type,
  styles,
  onClick,
  isSubmitting,
  isValid,
  icon,
}: SubmitButtonProps) {
  return (
    <button
      disabled={isSubmitting || !isValid}
      type={type}
      onClick={onClick}
      className={`w-full text-sm font-medium rounded-[8px] h-[2.5rem] cursor-pointer flex justify-center items-center gap-1 ${styles} ${
        !isValid || isSubmitting
          ? "bg-zinc-300 text-white"
          : "bg-black text-white"
      }`}
    >
      {title}
      {icon && icon}
    </button>
  );
}