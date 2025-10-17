import { type DateRange } from "react-day-picker";
import type { DaySlots, Slot } from "@/types";

const processSchedule = (
  dateRange: DateRange | undefined,
  openTime: string,
  closeTime: string,
  slotDuration: number,
  noOfSlots: number
) => {
  if (!dateRange?.from || !dateRange.to) return [];

  if (slotDuration <= 0 || noOfSlots <= 0) return [];

  const result: DaySlots[] = [];

  let currentDate = new Date(dateRange.from);
  const endDate = new Date(dateRange.to);

  while (currentDate <= endDate) {
    const slots: Slot[] = [];

    const openTimeParts = openTime.split(":");
    const closeTimeParts = closeTime.split(":");

    if (openTimeParts.length !== 2 || closeTimeParts.length !== 2) {
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
      continue;
    }

    const [openHour, openMinute] = openTimeParts.map(Number);
    const [closeHour, closeMinute] = closeTimeParts.map(Number);

    if (
      isNaN(openHour) ||
      isNaN(openMinute) ||
      isNaN(closeHour) ||
      isNaN(closeMinute)
    ) {
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
      continue;
    }

    let start = new Date(currentDate);
    start.setHours(openHour, openMinute, 0, 0);

    let end = new Date(currentDate);
    end.setHours(closeHour, closeMinute, 0, 0);

    if (end <= start) {
      end = new Date(end.getTime() + 24 * 60 * 60 * 1000);
    }

    let count = 0;

    while (start < end && count < noOfSlots) {
      const slotStart = new Date(start);
      const slotEnd = new Date(start.getTime() + slotDuration * 60000);

      if (slotEnd > end) break;

      slots.push({
        start: slotStart.toTimeString().slice(0, 5),
        end: slotEnd.toTimeString().slice(0, 5),
      });

      start = slotEnd;
      count++;
    }

    result.push({
      date:
        currentDate.getFullYear() +
        "-" +
        String(currentDate.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(currentDate.getDate()).padStart(2, "0"),
      slots,
    });

    currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
  }

  return result;
};

export default processSchedule;
