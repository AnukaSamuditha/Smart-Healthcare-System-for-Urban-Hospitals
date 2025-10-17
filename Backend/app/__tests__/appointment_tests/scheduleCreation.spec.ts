import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Schedule from "../../models/Schedule.js";
import Doctor from "../../models/Doctor.js";
import { checkTimeOverlap } from "../../utils/checkTimeOverlap.js";
import jwt from "jsonwebtoken";

vi.mock("../../models/Schedule.js");
vi.mock("../../models/Doctor.js");
vi.mock("../../utils/checkTimeOverlap.js");
vi.mock("jsonwebtoken");

describe("Schedule Creation Functionality", () => {
  let mockRequest: any;
  let mockResponse: any;
  let mockDoctor: any;

  beforeEach(() => {
    mockDoctor = {
      _id: "doctor123",
      email: "doctor@test.com",
      hospitals: [],
      save: vi.fn().mockResolvedValue(true),
    };

    mockRequest = {
      body: {
        hospitalID: "hospital001",
        hospitalName: "City Hospital",
        title: "General Consultation",
        description: "Morning consultation hours",
        recurring: "weekly",
        dateRange: {
          from: "2025-10-20",
          to: "2025-10-27",
        },
        openTime: "09:00",
        closeTime: "17:00",
        noOfSlots: 8,
        duration: 60,
        slots: [],
      },
      cookies: {
        token: "valid-token",
      },
    };

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };

    vi.mocked(jwt.verify).mockReturnValue({ user: { id: "doctor123" } } as any);
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should create schedule successfully with valid data", async () => {
    const mockSchedule = {
      _id: "schedule123",
      ...mockRequest.body,
      ownerId: "doctor123",
      save: vi.fn().mockResolvedValue(true),
    };

    vi.mocked(Doctor.findById).mockReturnValue({
      select: vi.fn().mockResolvedValue(mockDoctor),
    } as any);

    vi.mocked(Schedule.find).mockResolvedValue([]);
    vi.mocked(Schedule.prototype.save).mockResolvedValue(mockSchedule);

    const { createSchedule } = await import("../../controllers/scheduleController.js");
    await createSchedule(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Schedule created successfully",
      })
    );
  });

  it("should reject schedule creation if user not found", async () => {
    vi.mocked(Doctor.findById).mockReturnValue({
      select: vi.fn().mockResolvedValue(null),
    } as any);

    const { createSchedule } = await import("../../controllers/scheduleController.js");
    await createSchedule(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Invalid user",
    });
  });

  it("should detect and reject conflicting schedules", async () => {
    const existingSchedule = {
      _id: "existing123",
      openTime: "10:00",
      closeTime: "16:00",
      dateRange: {
        from: new Date("2025-10-20"),
        to: new Date("2025-10-25"),
      },
    };

    vi.mocked(Doctor.findById).mockReturnValue({
      select: vi.fn().mockResolvedValue(mockDoctor),
    } as any);

    vi.mocked(Schedule.find).mockResolvedValue([existingSchedule] as any);
    vi.mocked(checkTimeOverlap).mockReturnValue(true);

    const { createSchedule } = await import("../../controllers/scheduleController.js");
    await createSchedule(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(409);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Schedule conflict occurred",
    });
  });

  it("should allow schedule creation if no time overlap exists", async () => {
    const existingSchedule = {
      _id: "existing123",
      openTime: "06:00",
      closeTime: "08:00",
      dateRange: {
        from: new Date("2025-10-20"),
        to: new Date("2025-10-25"),
      },
    };

    const mockSchedule = {
      _id: "schedule123",
      ...mockRequest.body,
      ownerId: "doctor123",
      save: vi.fn().mockResolvedValue(true),
    };

    vi.mocked(Doctor.findById).mockReturnValue({
      select: vi.fn().mockResolvedValue(mockDoctor),
    } as any);

    vi.mocked(Schedule.find).mockResolvedValue([existingSchedule] as any);
    vi.mocked(checkTimeOverlap).mockReturnValue(false);
    vi.mocked(Schedule.prototype.save).mockResolvedValue(mockSchedule);

    const { createSchedule } = await import("../../controllers/scheduleController.js");
    await createSchedule(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
  });

  it("should handle errors during schedule creation", async () => {
    vi.mocked(Doctor.findById).mockReturnValue({
      select: vi.fn().mockRejectedValue(new Error("Database error")),
    } as any);

    const { createSchedule } = await import("../../controllers/scheduleController.js");
    await createSchedule(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Error occurred while creating the schedule",
      })
    );
  });
});
