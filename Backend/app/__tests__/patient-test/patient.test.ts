import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import express from "express";
import bodyParser from "body-parser";

import Patient from "../../models/Patient.js";
import * as patientController from "../../controllers/patientController.js";
import * as managementController from "../../controllers/managementController.js";

const app = express();
app.use(bodyParser.json());


app.get("/patient/:id", patientController.getPatient);
app.post("/management/check", managementController.checkPatientExistence);

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    await Patient.deleteMany({});
});

describe("🧪 Patient Controller Tests", () => {

    it("✅ should fetch a patient by id", async () => {
        const userId = new mongoose.Types.ObjectId(); // ✅ Generate valid ObjectId

        const patient = new Patient({
            userId,
            fname: "John",
            lname: "Doe",
            dob: new Date(),
            gender: "male",
            nic: "900515123V",
            btype: "O+",
            phone: "+94112345678",
            address: "123 Main Street",
            city: "Colombo",
            province: "Western",
            postalCode: "10000",
            emergency: { name: "Jane", relationship: "Sister", phone: "0771234567" },
        });
        await patient.save();

        const res = await request(app).get(`/patient/${patient._id}`);

        expect(res.status).toBe(200);
        expect(res.body.patient.fname).toBe("John");
        expect(res.body.patient.lname).toBe("Doe");
    });

    it("✅ should check patient existence by NIC + full name + phone", async () => {
        const userId = new mongoose.Types.ObjectId(); // ✅ Generate valid ObjectId
        const patient = new Patient({
            userId,
            fname: "John",
            lname: "Doe",
            dob: new Date(),
            gender: "male",
            nic: "900515123V",
            btype: "O+",
            phone: "+94112345678",
            address: "123 Main Street",
            city: "Colombo",
            province: "Western",
            postalCode: "10000",
            emergency: { name: "Jane", relationship: "Sister", phone: "0771234567" },
        });
        await patient.save();

        const res = await request(app)
            .post("/management/check")
            .send({ nic: "900515123V", fname: "John", lname: "Doe", phone: "+94112345678" });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Patient found");
        expect(res.body.patient.nic).toBe("900515123V");
    });

    it("❌ should return 404 if patient does not exist", async () => {
        const res = await request(app)
            .post("/management/check")
            .send({ nic: "000000000V", fname: "Jane", lname: "Doe", phone: "0111234567" });

        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Patient not found");
    });
});