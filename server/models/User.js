import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, default: "_" },
    email: { type: String, required: true, unique: true },
    mobile: { type: Number, required: true, unique: true },
    password: { type: String },
    adress: { type: String },
    gender: { type: String, 
      enum : ["male", "female", "Prefer-to-not-say"],
      default: "Prefer-to-not-say" },
   roll: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },    
  },
  {
    timestamps: true,
  }
);
const User = model("User", UserSchema);
export default User;
