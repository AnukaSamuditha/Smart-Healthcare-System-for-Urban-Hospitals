import { authenticate, authorize } from "#auth/auth.js";
import {
  createBooking,
  getBooking,
  cancelBooking,
  updateBooking,
  getBookingQRCode,
} from "#controllers/bookingController.js";
import express from "express";

const router = express.Router();

router.post("/", authenticate, authorize(["patient", "doctor"]), createBooking);
router.get("/:id", authenticate, authorize(["regular", "doctor"]), getBooking);
router.get(
  "/qr/:id",
  authenticate,
  authorize(["patient", "doctor"]),
  getBookingQRCode,
);
router.patch(
  "/:id",
  authenticate,
  authorize(["patient", "doctor"]),
  updateBooking,
);
router.delete(
  "/:id",
  authenticate,
  authorize(["patient", "doctor"]),
  cancelBooking,
);

export default router;