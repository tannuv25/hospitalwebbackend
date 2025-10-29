import Appointment from "../models/appointmentModel.js";

// ✅ Create new appointment
export const createAppointment = async (req, res) => {
  try {
    const { fullName, email, phone, department, doctorName, date, time, message } = req.body;

    // Validate input
    if (!fullName || !email || !phone || !department || !doctorName || !date || !time) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const appointment = await Appointment.create({
      fullName,
      email,
      phone,
      department,
      doctorName,
      date,
      time,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully!",
      appointment,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// ✅ Get all appointments (for admin dashboard)
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch appointments" });
  }
};

// ✅ Get single user appointments by email
export const getAppointmentsByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const appointments = await Appointment.find({ email }).sort({ createdAt: -1 });

    if (!appointments.length) {
      return res.status(404).json({ success: false, message: "No appointments found for this email" });
    }

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching appointments" });
  }
};

// ✅ Cancel Appointment
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ success: false, message: "Appointment not found" });

    appointment.status = "cancelled";
    await appointment.save();

    res.status(200).json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error cancelling appointment" });
  }
};
