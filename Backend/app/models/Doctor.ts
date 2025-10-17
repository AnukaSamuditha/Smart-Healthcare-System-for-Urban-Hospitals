import {
  Schema,
} from "mongoose";
import User, { IUser, UserRoles } from "./User.js";
import { ISchedule } from "./Schedule.js";

export interface IDoctorHospital {
    id : string,
    name : string,
    schedule : ISchedule,
}

export interface IDoctor extends IUser{
    licenceNumber : string,
    hospitals : IDoctorHospital[]
}

const doctorHospitalSchema = new Schema<IDoctorHospital>({
    id : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    schedule : {
        type : Schema.Types.ObjectId,
        ref : "Schedule",
        required : true
    }

});

const doctorSchema = new Schema<IDoctor>({
    licenceNumber :{
        type : String,
        required : false
    },
    hospitals : {
        type : [doctorHospitalSchema],
        default : []
    }

})

const Doctor = User.discriminator(UserRoles.DOCTOR, doctorSchema);
export default Doctor;