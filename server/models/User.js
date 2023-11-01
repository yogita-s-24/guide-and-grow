import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, default: "_" },
    email: { type: String, required: true, unique: true },
    mobile: { type: Number, required: true, unique: true },
    password: { type: String },
    address: { type: String },
    gender: { type: String, default: "Prefer to not say" },
  },
  {
    timestamps: true,
  }
);
const User = model("User", UserSchema);
export default User;
