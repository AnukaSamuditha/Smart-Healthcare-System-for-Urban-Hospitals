import { describe, it, expect, vi, beforeEach } from "vitest";
import Booking from "../../models/Booking.js";
import Schedule from "../../models/Schedule.js";
import User from "../../models/User.js";
import { sendMail } from "../../utils/sendEmail.js";
import jwt from "jsonwebtoken";

vi.mock("../../models/Booking.js");
vi.mock("../../models/Schedule.js");
vi.mock("../../models/User.js");
vi.mock("../../utils/sendEmail.js");
vi.mock("jsonwebtoken");

describe("Booking Creation Functionality", () => {
  let mockRequest: any;
  let mockResponse: any;

  beforeEach(() => {
    mockRequest = {
      body: {
        slotID: "slot123",
        fullName: "Anuka Samuditha",
        email: "patient@test.com",
        phoneNumber: "0771234567",
        scheduleID: "schedule123",
      },
      cookies: { token: "valid-token" },
    };

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };

    vi.mocked(jwt.verify).mockReturnValue({ user: { id: "user123" } } as any);
  });

  it("should create booking successfully with valid data", async () => {
    const mockUser = { _id: "user123", email: "patient@test.com" };
    const mockSchedule = { _id: "schedule123", ownerId: "doctor123" };
    const mockOwner = { _id: "doctor123", email: "doctor@test.com" };
    const mockBooking = { _id: "booking123", ...mockRequest.body };

    vi.mocked(User.findById).mockReturnValueOnce({
      select: vi.fn().mockResolvedValue(mockUser),
    } as any);
    vi.mocked(Schedule.findById).mockResolvedValue(mockSchedule as any);
    vi.mocked(User.findById).mockResolvedValueOnce(mockOwner as any);
    vi.mocked(Booking.create).mockResolvedValue(mockBooking as any);
    vi.mocked(Schedule.findOneAndUpdate).mockResolvedValue(mockSchedule as any);
    vi.mocked(sendMail).mockResolvedValue(undefined);

    const { createBooking } = await import("../../controllers/bookingController.js");
    await createBooking(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Booking created successfully" })
    );
  });

  it("should reject booking with missing required fields", async () => {
    mockRequest.body = { slotID: "slot123", fullName: "Anuka Samuditha" };

    const { createBooking } = await import("../../controllers/bookingController.js");
    await createBooking(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: "Missing required fields" });
  });

  it("should reject booking if schedule not found", async () => {
    vi.mocked(User.findById).mockReturnValue({
      select: vi.fn().mockResolvedValue({ _id: "user123" }),
    } as any);
    vi.mocked(Schedule.findById).mockResolvedValue(null);

    const { createBooking } = await import("../../controllers/bookingController.js");
    await createBooking(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: "Invalid schedule id" });
  });

  it("should handle errors during booking creation", async () => {
    vi.mocked(User.findById).mockReturnValue({
      select: vi.fn().mockRejectedValue(new Error("Database error")),
    } as any);

    const { createBooking } = await import("../../controllers/bookingController.js");
    await createBooking(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
});
