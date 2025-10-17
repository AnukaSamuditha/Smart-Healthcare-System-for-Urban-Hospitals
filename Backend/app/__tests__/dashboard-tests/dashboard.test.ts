import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import express from "express";
import bodyParser from "body-parser";
import Patient from "../../models/Patient.js";
import * as patientController from "../../controllers/patientController.js";

const app = express();
app.use(bodyParser.json());
app.get("/patients", patientController.getAllPatients);

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

describe("Dashboard Tests", () => {
    it("should fetch all patients", async () => {
        const patient1 = new Patient({ userId: "68f22848ba13a93fe61e1732", fname: "John", lname: "Doe", dob: new Date(), gender: "male", nic: "123", btype: "O+", phone: "111", address: "addr", city: "C", province: "P", postalCode: "100", emergency: { name: "A", relationship: "B", phone: "222" } });
        const patient2 = new Patient({ userId: "68f22848ba13a93fe61e1735", fname: "Jane", lname: "Smith", dob: new Date(), gender: "female", nic: "124", btype: "A+", phone: "333", address: "addr2", city: "C2", province: "P2", postalCode: "101", emergency: { name: "C", relationship: "D", phone: "444" } });
        await patient1.save();
        await patient2.save();

        const res = await request(app).get("/patients");
        expect(res.status).toBe(200);
        expect(res.body.patients.length).toBe(2);
    });
});