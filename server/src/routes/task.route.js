import express from "express";
import authVerification from "./../middleware/auth.middleware.js";
import {
  createTask,
  getTasks,
  startTimer,
  pauseTimer,
  resetTimer,
  deleteTask,
} from "../controllers/task.controllers.js";

const router = express.Router();

// Task CRUD
router.post("/create", authVerification, createTask);
router.get("/alltask", authVerification, getTasks);

// Timer controls
router.put("/:id/start", authVerification, startTimer);
router.put("/:id/pause", authVerification, pauseTimer);
router.put("/:id/reset", authVerification, resetTimer);
router.delete("/:id", authVerification, deleteTask);

export default router;
