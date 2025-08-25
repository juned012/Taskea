import { useEffect, useState, useContext } from "react";
import { Play, Pause, RotateCcw, Trash2, MoreHorizontal } from "lucide-react";
import { UserContext } from "../context/UserContext";

const TaskCard = ({ task }) => {
  const {
    handleStartTask,
    handlePauseTask,
    handleResetTask,
    handleFetchTask,
    handleDeleteTask,
  } = useContext(UserContext);

  // Start with elapsedTime from backend
  const [elapsed, setElapsed] = useState(task.elapsedTime || 0);

  // Keep ticking locally ONLY if running
  useEffect(() => {
    let interval;
    if (task.isRunning) {
      interval = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [task.isRunning]);

  // Format seconds into MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleReset = async () => {
    const res = await handleResetTask(task._id);
    if (res.success) {
      setElapsed(0); // ✅ reset UI immediately
      await handleFetchTask(); // ✅ refresh from backend
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const res = await handleDeleteTask(task._id);
      if (res.success) {
        console.log("Task deleted");
      }
    }
  };
  const getPriorityColors = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "text-red-500 bg-red-500";
      case "medium":
        return "text-yellow-500 bg-yellow-500";
      case "low":
        return "text-green-500 bg-green-500";
      default:
        return "text-slate-500 bg-slate-500";
    }
  };

  const priorityColors = getPriorityColors(task.priority).split(" ");

  return (
    <div className="relative p-4 rounded-lg flex items-start gap-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800">
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">
            {task.title}
          </h3>

          <span
            className={`text-[12px] flex items-center gap-1 ${priorityColors[0]}`}
          >
            <span
              className={`w-2 h-2 rounded-full ${priorityColors[1]}`}
            ></span>
            {task.priority}
          </span>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">
          {task.description}
        </p>

        <div className="mt-3 flex items-center gap-3">
          <div className="font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-800 dark:text-slate-100">
            {formatTime(elapsed)}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-300 flex items-center gap-1">
            <span
              className={`w-2 h-2 rounded-full ${
                task.isRunning ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            {task.status
              ? "Completed"
              : task.isRunning
              ? "In Progress"
              : "Paused"}
          </div>
        </div>
      </div>

      <div className="flex absolute bottom-2 right-2 gap-2">
        <div className="flex gap-2">
          <button
            onClick={() =>
              task.isRunning
                ? handlePauseTask(task._id)
                : handleStartTask(task._id)
            }
            className={`p-2 rounded text-white transition ${
              task.isRunning
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {task.isRunning ? <Pause size={18} /> : <Play size={18} />}
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="p-2 border border-slate-300 dark:border-slate-600 rounded text-slate-800 dark:text-slate-200"
          >
            <RotateCcw size={18} />
          </button>

          <button
            onClick={handleDelete}
            className="p-2 text-red-600 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
