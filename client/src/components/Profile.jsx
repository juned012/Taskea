import { LogOut, X } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Profile = ({ onClose }) => {
  const { Logout, user } = useContext(UserContext);
  return (
    <div
      className="flex items-center justify-center min-h-screen w-full
     bg-black/30 dark:bg-black/50 backdrop-blur-xl fixed left-0 top-0 z-30"
    >
      <div className="relative w-96 h-auto bg-white dark:bg-gray-900 rounded-md p-5 dark:shadow-gray-950">
        <div
          onClick={onClose}
          className="absolute top-3 right-3 inline-block bg-gray-300
           dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-500
                               rounded-full p-2 transition"
        >
          <X size={18} className="text-gray-800 dark:text-gray-300" />
        </div>

        <h1 className="text-center text-xl font-black text-gray-800 dark:text-gray-100">
          Your Profile
        </h1>

        <div className="flex items-center justify-center my-4">
          <h1
            className="bg-gradient-to-br from-red-400 via-blue-600 to-red-400 w-20 h-20 rounded-full
           flex items-center justify-center text-3xl text-white shadow-md"
          >
            {user?.username?.charAt(0).toUpperCase()}
          </h1>
        </div>

        <h2
          className="text-transparent bg-gradient-to-r from-red-500
                  via-blue-400 to-blue-700 
                    bg-clip-text font-bold text-center text-xl"
        >
          {user.username}
        </h2>
        <h2 className="text-gray-900 dark:text-gray-500 mt-1 text-center">
          {user.email}
        </h2>

        <div>
          <button
            onClick={Logout}
            className="text-white p-2 mt-4 text-center text-sm flex items-center gap-2 justify-center
            rounded-md w-full bg-red-600 hover:bg-red-700 cursor-pointer"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
