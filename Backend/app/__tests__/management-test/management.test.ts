import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

import Patient from "../../models/Patient.js";
import * as patientController from "../../controllers/patientController.js";

const JWT_SECRET = "testsecret";
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.post("/patient", (req, res, next) => {
    req.cookies = { token: jwt.sign({ user: { id: "test-user-id" } }, JWT_SECRET) };
    next();
}, patientController.createOrUpdatePatient);
app.delete("/patient/:id", patientController.deletePatient);

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    await Patient.deleteMany({});
});

describe("Patient Management Tests", () => {
    it("should create a new patient", async () => {
        const res = await request(app)
            .post("/patient")
            .send({
                fname: "John",
                lname: "Doe",
                dob: "2000-01-01",
                gender: "male",
                nic: "900515123V",
                btype: "O+",
                phone: "+94112345678",
                address: "123 Main Street",
                city: "Colombo",
                province: "Western",
                postalCode: "10000",
                emergency: { name: "Jane Doe", relationship: "Sister", phone: "+94119876543" },
            });

        expect(res.status).toBe(201);
        expect(res.body.patient.fname).toBe("John");
    });

    it("should update an existing patient", async () => {
        const patient = new Patient({ userId: "68f22848ba13a93fe61e1733", fname: "John", lname: "Doe", dob: new Date("2000-01-01"), gender: "male", nic: "900515123V", btype: "O+", phone: "+94112345678", address: "123 Main Street", city: "Colombo", province: "Western", postalCode: "10000", emergency: { name: "Jane Doe", relationship: "Sister", phone: "+94119876543" } });
        await patient.save();

        const res = await request(app)
            .post("/patient")
            .send({ fname: "John", lname: "Doe", dob: "2000-01-01", gender: "male", nic: "900515123V", btype: "A+", phone: "+94112345678", address: "456 New Street", city: "Colombo", province: "Western", postalCode: "10000", emergency: { name: "Jane Doe", relationship: "Sister", phone: "+94119876543" } });

        expect(res.status).toBe(200);
        expect(res.body.patient.btype).toBe("A+");
        expect(res.body.patient.address).toBe("456 New Street");
    });

    it("should delete a patient", async () => {
        const patient = new Patient({ userId: "68f22848ba13a93fe61e1732", fname: "John", lname: "Doe", dob: new Date(), gender: "male", nic: "123", btype: "O+", phone: "111", address: "addr", city: "C", province: "P", postalCode: "100", emergency: { name: "A", relationship: "B", phone: "222" } });
        await patient.save();

        const res = await request(app).delete(`/patient/${patient._id}`);
        expect(res.status).toBe(200);

        const check = await Patient.findById(patient._id);
        expect(check).toBeNull();
    });
});