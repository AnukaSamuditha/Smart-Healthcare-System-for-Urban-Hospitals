import Booking, { IBooking } from "#models/Booking.js";
import Schedule from "#models/Schedule.js";
import User from "#models/User.js";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import { Booking_Template } from "#email_templates/booking_template.js";
import { sendMail } from "#utils/sendEmail.js";
import type { EmailOptionsType } from "#utils/sendEmail.js";
import generateBookingQRCode from "#utils/generateQRCode.js";
import { ConfirmBooking } from "#email_templates/booking_confirmation.js";

const createBooking = async (req: Request, res: Response) => {
  try {
    const {
      slotID,
      fullName,
      email,
      phoneNumber,
      notes,
      propertyID,
      scheduleID,
    } = req.body;

    if (!slotID || !fullName || !email || !phoneNumber) {
      res.status(400).json({
        message: "Missing required fields",
      });
      return;
    }

    const token = req.cookies.token;
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    const user = await User.findById(decoded.user.id).select("-password");
    const schedule = await Schedule.findById(scheduleID);

    if (!schedule) {
      res.status(404).json({
        message: "Invalid schedule id",
      });
      return;
    }

    const propertyOwner = await User.findById(schedule.ownerId);

    const booking = await Booking.create({
      ownerID: user ? user._id : null,
      slotID,
      fullName,
      email,
      phoneNumber,
      propertyID: propertyID ? propertyID : null,
      notes: notes ? notes : null,
    });

    const updatedSchedule = await Schedule.findOneAndUpdate(
      {
        "slots.slots._id": new mongoose.Types.ObjectId(slotID),
      },
      {
        $set: {
          "slots.$[].slots.$[slot].isBooked": true,
          "slots.$[].slots.$[slot].bookingID": booking._id,
        },
      },
      {
        new: true,
        arrayFilters: [{ "slot._id": new mongoose.Types.ObjectId(slotID) }],
      },
    );

    if (!updatedSchedule) {
      await Booking.findByIdAndDelete(booking._id);
      return res.status(404).json({
        message: "Slot not found",
      });
    }

    const mailOptions: EmailOptionsType = {
      from: "nextestate@gmail.com",
      to: propertyOwner?.email ?? "",
      subject: "Booking Made",
      html: Booking_Template(
        propertyOwner?.username ?? "",
        "Colombo 07 Mansion",
        "Colombo",
        String(booking?._id),
        new Date("2025-09-25"),
        fullName,
        email,
        phoneNumber,
        new Date("2025-09-24"),
        "10:30",
        "11:00",
        "Hello there",
      ),
    };

    await sendMail(mailOptions);

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while creating the schedule",
      error,
    });
  }
};

const getBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        message: "Invalid booking id",
      });
      return;
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      res.status(404).json({
        message: "Booking not found!",
      });

      return;
    }

    res.status(200).json({
      message: "Booking is fetched successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while getting the booking",
      error,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { fullName, email, phoneNumber, notes } = req.body;
    const updateFields: Partial<IBooking> = {};

    if (fullName) updateFields.fullName = fullName;
    if (email) updateFields.email = email;
    if (phoneNumber) updateFields.phoneNumber = phoneNumber;
    if (notes) updateFields.notes = notes;

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      {
        $set: updateFields,
      },
      { new: true },
    );

    if (!updatedBooking) {
      res.status(404).json({
        message: "Invalid booking id",
      });
      return;
    }

    res.status(200).json({
      message: "Booking updated successfully",
      updatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while updating the booking",
      error,
    });
  }
};

const cancelBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        message: "Missing required fields",
      });
      return;
    }

    const booking = await Booking.findByIdAndDelete(id);

    await Schedule.findOneAndUpdate(
      {
        "slots.slots._id": new mongoose.Types.ObjectId(booking?.slotID),
      },
      {
        $set: {
          "slots.$[].slots.$[slot].isBooked": false,
          "slots.$[].slots.$[slot].bookingID": null,
        },
      },
      {
        new: true,
        arrayFilters: [
          { "slot._id": new mongoose.Types.ObjectId(booking?.slotID) },
        ],
      },
    );

    if (!booking) {
      res.status(404).json({
        message: "Booking not found!",
      });

      return;
    }

    res.status(200).json({
      message: "Booking is canceled successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while getting the booking",
      error,
    });
  }
};

const getBookingQRCode = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    const token = req.cookies.token;
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    const user = await User.findById(decoded.user.id).select("-password");

    if (!booking) {
      res.status(400).json({
        message: "Invalid booking id",
      });
      return;
    }

    const QRCode = await generateBookingQRCode(id);

    if (!QRCode) {
      res.status(404).json({
        message: "Error generating QR code",
      });

      return;
    }

    const mailOptions: EmailOptionsType = {
      from: "nextestate@gmail.com",
      to: booking?.email ?? "",
      subject: "Booking Made",
      html: ConfirmBooking(user?.username ?? "", QRCode),
    };

    await sendMail(mailOptions);
    // Add to send the email to user's registered email as well

    res.status(200).json({
      message: "Booking QR code generated successfully",
      QRCode,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while generating the booking QR code",
      error,
    });
  }
};

export {
  createBooking,
  getBooking,
  updateBooking,
  cancelBooking,
  getBookingQRCode,
};