import { X } from "lucide-react";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const CreateTask = ({ onClose }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "low",
  });

  const { handleCreateTask } = useContext(UserContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleCreateTask(form);
    if (result.success) {
      onClose();
    } else {
      alert(result.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen w-full
     bg-black/30 dark:bg-black/50 backdrop-blur-xl fixed left-0 top-0 z-50"
    >
      <div className="relative w-[500px] bg-white dark:bg-gray-900 rounded-xl p-8 dark:shadow-gray-950">
        <div
          onClick={onClose}
          className="absolute top-3 right-3 inline-block bg-gray-200
           dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-500
                               rounded-full p-2 transition"
        >
          <X size={18} className="text-gray-800 dark:text-gray-300" />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">
          Create New Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleInputChange}
            type="text"
            placeholder="Enter task title"
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md bg-transparent 
                     text-gray-800 dark:text-gray-200 dark:border-gray-600 
                     focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-800"
          />

          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            placeholder="Enter task description"
            rows="4"
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md bg-transparent 
                     text-gray-800 dark:text-gray-200 dark:border-gray-600 
                     focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-800"
          ></textarea>

          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Priority
          </label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md bg-transparent 
                     text-gray-800 dark:text-gray-200 dark:border-gray-600 
                     focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-800"
          >
            <option className="bg-white dark:bg-gray-900" value="low">
              Low
            </option>
            <option className="bg-white dark:bg-gray-900" value="medium">
              Medium
            </option>
            <option className="bg-white dark:bg-gray-900" value="high">
              High
            </option>
          </select>

          <button
            type="submit"
            className="w-full 
             bg-gradient-to-bl from-red-500 via-blue-400 to-blue-700
             hover:from-red-600 hover:via-blue-500 hover:to-blue-800
             dark:from-red-700 dark:via-blue-600 dark:to-blue-900
             dark:hover:from-red-800 dark:hover:via-blue-700 dark:hover:to-blue-950
             cursor-pointer text-white py-2 rounded-md 
             transition duration-300 ease-in-out"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
