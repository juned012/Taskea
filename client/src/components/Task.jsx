import { useContext, useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import { Plus } from "lucide-react";
import TaskCard from "./TaskCard";
import { UserContext } from "../context/UserContext";

const Task = () => {
  const [isOpenCreateTask, setIsOpenCreateTask] = useState(false);

  const { allTasks, handleFetchTask } = useContext(UserContext);

  useEffect(() => {
    handleFetchTask();
  }, []);

  return (
    <div className="min-h-screen w-full dark:bg-gray-900">
      <h1 className="text-center py-8 text-2xl dark:text-white font-black ">
        Your Tasks
      </h1>
      <div
        className="m-auto max-w-xl space-y-3 max-h-[70vh] overflow-y-auto p-5 rounded-xl border border-gray-200
    dark:border-gray-700 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent scroll-smooth"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#4B5563 transparent",
        }}
      >
        {allTasks.length === 0 && (
          <p className="text-center dark:text-white min-h-[50vh] flex items-center justify-center">
            No tasks found.
          </p>
        )}
        {allTasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>

      <div
        onClick={() => setIsOpenCreateTask(true)}
        className="absolute bottom-10 right-10 flex items-center justify-center  
        bg-gradient-to-bl from-red-600 via-blue-500 to-blue-800 text-white rounded-full h-14 w-14 cursor-pointer"
      >
        <Plus size={20} />
      </div>

      {isOpenCreateTask && (
        <CreateTask
          onClose={() => {
            setIsOpenCreateTask(false);
          }}
        />
      )}
    </div>
  );
};

export default Task;
