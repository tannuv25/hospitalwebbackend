// models/doctorModel.js
import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // default doctor icon
    },
    availableDays: {
      type: [String],
      default: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    },
    availableTime: {
      type: String,
      default: "10:00 AM - 5:00 PM",
    },
    contact: {
      type: String,
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
