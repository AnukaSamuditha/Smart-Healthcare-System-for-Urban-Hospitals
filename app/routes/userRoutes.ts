import { authenticate, authorize } from "#auth/auth.js";
import {
  createUser,
  getUser,
  loginUser,
  userInfo,
} from "#controllers/userController.js";
import express from "express";

const router = express.Router();

router.post("/", createUser);
router.get("/", authenticate, authorize, getUser);
router.get("/self", authenticate, userInfo);
router.post("/login", loginUser);

export default router;