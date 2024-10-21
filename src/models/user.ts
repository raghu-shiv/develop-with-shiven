import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  age?: number;
  gender?: string;
  location?: string;
  role: "instructor" | "learner"; // Adjust role field to expected types
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: false },
    gender: { type: String, required: false },
    location: { type: String, required: false },
    role: { type: String, enum: ["instructor", "learner"], required: true }, // Ensure this matches the role values in your app
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
