import type { UseFormRegister, FieldError } from "react-hook-form";
import type { MouseEventHandler } from "react";

export type LabelType = {
  title: string;
  name: string;
  styles?: any;
};

export type InputFieldProps = {
  name: string;
  type?: string;
  styles?: string;
  value?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  step?: number;
  defaultValue?: string;
};

export type SubmitButtonProps = {
  title: string;
  type?: "button" | "submit" | "reset";
  styles?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isSubmitting?: boolean;
  isValid?: boolean;
  icon?: any;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
  role: "patient" | "doctor" | "admin";
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Slot = {
  start: string;
  end: string;
}

export type DaySlots ={
  date: string;
  slots: Slot[];
}

export type ScheduleType = {
  title: string;
  description: string;
  recurring: "monthly" | "weekly";
  dateRange: { from: Date; to: Date };
  weekRange: { from: Date; to: Date };
  openTime: string;
  closeTime: string;
  noOfSlots: number;
  duration: number;
};
