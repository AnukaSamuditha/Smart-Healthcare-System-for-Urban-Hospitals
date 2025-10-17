import { Request, Response } from "express";
import Patient from "../models/Patient.js";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;


export const createOrUpdatePatient = async (req: Request, res: Response) => {
    try {
        const token = req.cookies?.token;
        if (!token) return res.status(401).json({ message: "Not logged in" });

        const decoded = jwt.verify(token, JWT_SECRET as string) as JwtPayload;
        const user = decoded.user;

        const patientData = req.body;

        if (!patientData.fname || !patientData.lname || !patientData.dob) {
            return res.status(400).json({ message: "Missing required patient fields" });
        }

        let patient = await Patient.findOne({ userId: user.id });

        if (patient) {
            patient = await Patient.findOneAndUpdate({ userId: user.id }, patientData, { new: true });
            return res.status(200).json({ message: "Patient updated", patient });
        }

        patient = new Patient({ ...patientData, userId: user.id });
        await patient.save();

        res.status(201).json({ message: "Patient created", patient });

    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: "Error creating/updating patient", error: err.message });
    }
};
export const getPatient = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const patient = await Patient.findById(id).select("-password");

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.status(200).json({ patient });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({
            message: "Error fetching patient",
            error: err.message,
        });
    }
};

// Get all patients (admin or doctor access can be added later)
export const getAllPatients = async (req: Request, res: Response) => {
    try {
        const patients = await Patient.find().select("-password");

        res.status(200).json({
            message: "Fetched all patients",
            patients,
        });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({
            message: "Error fetching patients",
            error: err.message,
        });
    }
};

export const deletePatient = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedPatient = await Patient.findByIdAndDelete(id);

        if (!deletedPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.status(200).json({
            message: "Patient deleted successfully",
            deletedPatient,
        });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({
            message: "Error deleting patient",
            error: err.message,
        });
    }
};