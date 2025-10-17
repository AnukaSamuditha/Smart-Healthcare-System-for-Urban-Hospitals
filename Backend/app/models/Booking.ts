import mongoose, {
  Document,
  Model,
  Schema,
  SchemaTypes,
  Types,
} from "mongoose";

export interface IBooking extends Document {
  ownerID: Types.ObjectId;
  slotID: Types.ObjectId;
  fullName: string;
  email: string;
  phoneNumber: string;
  notes: string;
  propertyID: string;
}

const bookingSchema: Schema<IBooking> = new Schema<IBooking>(
  {
    ownerID: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: false,
    },
    slotID: {
      type: SchemaTypes.ObjectId,
      ref: "Slot",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    propertyID: {
      type: String,
    },
  },
  { timestamps: true },
);

const Booking: Model<IBooking> = mongoose.model("Booking", bookingSchema);

export default Booking;