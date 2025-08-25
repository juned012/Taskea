import express from "express";
import { LoginUser, signupUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", LoginUser);

export default router;
