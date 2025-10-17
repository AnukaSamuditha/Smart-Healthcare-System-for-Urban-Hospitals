import { Router } from "express";
import {
    createOrUpdatePatient,
    getPatient,
    getAllPatients,
    deletePatient,
} from "#controllers/patientController.js";
import { authenticate, authorize } from "../auth/auth.js";

const router = Router();

router.post("/", authenticate, authorize(["patient"]), createOrUpdatePatient);
router.get("/", authenticate, authorize(["admin", "doctor"]), getAllPatients);
router.get("/:id", authenticate, getPatient);
router.delete("/:id", authenticate, authorize(["admin"]), deletePatient);

export default router;