import mongoose, {
  Date,
  Document,
  Model,
  Schema,
  SchemaTypes,
  Types,
} from "mongoose";

export interface Slot {
  date: Date;
  slots: [
    {
      start: string;
      end: string;
      isBooked: boolean;
      bookingID: Types.ObjectId;
    },
  ];
}

export interface ISchedule extends Document {
  ownerId: Types.ObjectId;
  hospitalID: string;
  title: string;
  description: string;
  recurring: string;
  dateRange: {
    from: Date;
    to: Date;
  };
  openTime: string;
  closeTime: string;
  noOfSlots: number;
  duration: number;
  slots: Slot[];
}

const scheduleSchema: Schema<ISchedule> = new Schema<ISchedule>(
  {
    ownerId: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    hospitalID: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    openTime: {
      type: String,
      required: true,
    },
    closeTime: {
      type: String,
      required: true,
    },
    dateRange: {
      type: {
        from: Date,
        to: Date,
      },
      required: true,
      _id: false,
    },
    recurring: {
      type: String,
      enum: ["weekly", "monthly"],
      required: true,
    },
    noOfSlots: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    slots: {
      type: [
        {
          date: {
            type: Date,
            required: true,
          },
          slots: [
            {
              start: { type: String, required: true },
              end: { type: String, required: true },
              isBooked: { type: Boolean, default: false },
              bookingID: { type: Types.ObjectId },
            },
          ],
        },
      ],
      required: true,
      default: [],
    },
  },
  { timestamps: true },
);

const Schedule: Model<ISchedule> = mongoose.model<ISchedule>(
  "Schedule",
  scheduleSchema,
);

export default Schedule;