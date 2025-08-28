import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import taskRoutes from "./routes/task.route.js";

connectDB();
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true, 
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
