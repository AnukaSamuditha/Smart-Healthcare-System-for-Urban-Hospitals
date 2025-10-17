import { describe, it, expect, vi, beforeEach } from "vitest";
import Booking from "../../models/Booking.js";
import Schedule from "../../models/Schedule.js";
import mongoose from "mongoose";

vi.mock("../../models/Booking.js");
vi.mock("../../models/Schedule.js");

describe("Booking Cancellation Functionality", () => {
  let mockRequest: any;
  let mockResponse: any;

  beforeEach(() => {
    mockRequest = {
      params: { id: "booking123" },
    };

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
  });

  it("should cancel booking successfully and free up the slot", async () => {
    const mockBooking = {
      _id: "booking123",
      slotID: "slot123",
      fullName: "Anuka Samuditha",
      email: "patient@test.com",
      phoneNumber: "0771234567",
    };

    const mockSchedule = {
      _id: "schedule123",
      slots: [
        {
          slots: [
            {
              _id: "slot123",
              isBooked: false,
              bookingID: null,
            },
          ],
        },
      ],
    };

    vi.mocked(Booking.findByIdAndDelete).mockResolvedValue(mockBooking as any);
    vi.mocked(Schedule.findOneAndUpdate).mockResolvedValue(mockSchedule as any);

    const { cancelBooking } = await import("../../controllers/bookingController.js");
    await cancelBooking(mockRequest, mockResponse);

    expect(Booking.findByIdAndDelete).toHaveBeenCalledWith("booking123");
    expect(Schedule.findOneAndUpdate).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Booking is canceled successfully",
    });
  });

  it("should return 400 if booking ID is missing", async () => {
    mockRequest.params = {};

    const { cancelBooking } = await import("../../controllers/bookingController.js");
    await cancelBooking(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Missing required fields",
    });
  });

  it("should return 404 if booking not found", async () => {
    vi.mocked(Booking.findByIdAndDelete).mockResolvedValue(null);

    const { cancelBooking } = await import("../../controllers/bookingController.js");
    await cancelBooking(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Booking not found!",
    });
  });

  it("should handle errors during cancellation", async () => {
    vi.mocked(Booking.findByIdAndDelete).mockRejectedValue(
      new Error("Database error")
    );

    const { cancelBooking } = await import("../../controllers/bookingController.js");
    await cancelBooking(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Error occurred while getting the booking",
      })
    );
  });
});
