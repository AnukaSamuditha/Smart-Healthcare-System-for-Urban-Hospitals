import Schedule from "../models/Schedule.js";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Doctor, { IDoctor } from "#models/Doctor.js";
import { checkTimeOverlap } from "#utils/checkTimeOverlap.js";

const createSchedule = async (req: Request, res: Response) => {
  try {
    const {
      hospitalID,
      hospitalName,
      title,
      description,
      recurring,
      dateRange,
      openTime,
      closeTime,
      noOfSlots,
      duration,
      slots,
    } = req.body;

    const token = req.cookies.token;
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    const user = await Doctor.findById(decoded.user.id).select("-password");

    if (!user) {
      res.status(404).json({
        message: "Invalid user",
      });
      return;
    }

    const conflictingSchedules = await Schedule.find({
        ownerId : user._id,
        $or : [
            {
                'dateRange.from' : {$lte : new Date(dateRange.to)},
                'dateRange.to' : {$gte : new Date(dateRange.from)}
            }
        ]
    })

    if(conflictingSchedules.length > 0){
        const hasTimeConflict = conflictingSchedules.some(existingSchedule => {
            return checkTimeOverlap(
                openTime,
                closeTime,
                existingSchedule.openTime,
                existingSchedule.closeTime
            )
        })

        if(hasTimeConflict){
            res.status(409).json({
                message : "Schedule conflict occurred",
            })

            return;
        }
    }

    const newSchedule = new Schedule({
      ownerId: user._id,
      hospitalID,
      title,
      description,
      recurring,
      dateRange,
      openTime,
      closeTime,
      noOfSlots,
      duration,
      slots,
    });

    const savedSchedule = await newSchedule.save();
    user.hospitals.push({
        id : hospitalID,
        name : hospitalName,
        schedule : newSchedule
    });
    await user.save();

    res.status(201).json({
      message: "Schedule created successfully",
      schedule: savedSchedule,
    });
  } catch (error) {
    console.error("Error creating schedule:", error);
    res.status(500).json({
      message: "Error occurred while creating the schedule",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export {createSchedule};