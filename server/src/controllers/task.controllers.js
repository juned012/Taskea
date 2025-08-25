import TodoModel from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const userId = req.user._id;

    const newTask = await TodoModel.create({
      title,
      description,
      priority,
      postedBy: userId,
    });
    res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const userId = req.user._id;

    const tasks = await TodoModel.find({ postedBy: userId })
      .populate("postedBy", "username email")
      .sort({ createdAt: -1 });

    // Calculate elapsed time in real-time
    const tasksWithTime = tasks.map((task) => {
      let totalElapsed = task.elapsedTime;
      if (task.isRunning && task.startTime) {
        const now = new Date();
        totalElapsed += Math.floor((now - task.startTime) / 1000);
      }
      return {
        ...task.toObject(),
        elapsedTime: totalElapsed, // always up-to-date
      };
    });

    res
      .status(200)
      .json({ message: "Tasks fetched successfully", tasks: tasksWithTime });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const startTimer = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TodoModel.findById(id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (!task.isRunning) {
      task.isRunning = true;
      task.startTime = new Date(); // start time saved
      await task.save();
    }

    res.json({ message: "Timer started", task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const pauseTimer = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TodoModel.findById(id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.isRunning) {
      const now = new Date();
      const secondsPassed = Math.floor((now - task.startTime) / 1000);
      task.elapsedTime += secondsPassed; // add elapsed seconds
      task.isRunning = false;
      task.startTime = null;
      await task.save();
    }

    res.json({ message: "Timer paused", task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const resetTimer = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TodoModel.findById(id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    task.elapsedTime = 0;
    task.isRunning = false;
    task.startTime = null;
    await task.save();

    res.json({ message: "Timer reset", task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TodoModel.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully", task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
