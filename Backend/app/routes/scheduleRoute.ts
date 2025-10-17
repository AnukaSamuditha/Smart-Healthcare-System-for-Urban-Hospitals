import { authenticate, authorize } from "#auth/auth.js";
import {
  createSchedule,
} from "#controllers/scheduleController.js";
import express from "express";

const router = express.Router();

router.post("/",authenticate, authorize(["doctor"]), createSchedule);

export default router;