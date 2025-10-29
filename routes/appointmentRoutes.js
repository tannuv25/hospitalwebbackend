import express from "express";
import {
  createAppointment,
  getAllAppointments,
  getAppointmentsByEmail,
  cancelAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

// Public routes
router.post("/book", createAppointment);
router.get("/all", getAllAppointments);
router.get("/:email", getAppointmentsByEmail);
router.put("/cancel/:id", cancelAppointment);

export default router;
