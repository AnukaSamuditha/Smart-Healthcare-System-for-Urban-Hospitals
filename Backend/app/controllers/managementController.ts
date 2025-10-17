import { Request, Response } from "express";
import Patient from "../models/Patient.js";


export const checkPatientExistence = async (req: Request, res: Response) => {
    try {
        const { nic, fname, lname, phone } = req.body;

        if (!nic || !fname || !lname || !phone) {
            return res.status(400).json({ message: "nic, fname, lname, phone, and dob are required" });
        }

        const patient = await Patient.findOne({
            nic,
            fname,
            lname,
            phone,
        });

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.status(200).json({ message: "Patient found", patient });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};