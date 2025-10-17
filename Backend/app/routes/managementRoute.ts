import {Router} from "express";
import { checkPatientExistence } from "#controllers/managementController.js";


const router = Router();

router.post("/check", checkPatientExistence);

export default router;
