import { Schema, model, Types } from "mongoose";

export interface IPatient {
    userId: Types.ObjectId | string;
    fname: string;
    lname: string;
    dob: Date;
    gender: string;
    nic: string;
    btype: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    emergency: {
        name: string;
        relationship: string;
        phone: string;
    };
}

const patientSchema = new Schema<IPatient>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    nic: { type: String, required: true },
    btype: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    postalCode: { type: String, required: true },
    emergency: {
        name: { type: String, required: true },
        relationship: { type: String, required: true },
        phone: { type: String, required: true }
    }
}, { timestamps: true });

export default model<IPatient>("Patient", patientSchema);