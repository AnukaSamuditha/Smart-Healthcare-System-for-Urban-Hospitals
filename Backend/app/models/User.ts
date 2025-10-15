import mongoose, {
  Schema,
  Document,
  Model,
} from "mongoose";

export enum UserRoles {
  REGULAR = "regular",
  SELLER = "seller",
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: UserRoles;
}

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRoles),
      default: UserRoles.REGULAR,
    },
  },
  { timestamps: true },
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;