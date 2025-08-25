import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: { type: Boolean, default: false },

    // Timer tracking
    elapsedTime: { type: Number, default: 0 }, // total seconds already saved
    isRunning: { type: Boolean, default: false },
    startTime: { type: Date, default: null }, // when user started last

    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const TodoModel = mongoose.model("Todo", todoSchema);

export default TodoModel;
