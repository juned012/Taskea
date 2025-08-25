import { Layers, LogIn, LogOut, UserRound } from "lucide-react";
import ToggleTheme from "./ToggleTheme";
import { useContext, useState } from "react";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import { UserContext } from "./../context/UserContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, Logout } = useContext(UserContext);

  return (
    <header className="w-full sticky top-0 z-50 bg-gray-100 dark:bg-gray-950 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-800 dark:text-white">
          <Layers size={30} className="text-blue-600" />
          Taskea
        </h1>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <div className="flex items-center gap-3">
                <span
                  className="text-transparent bg-gradient-to-r from-red-500
                  via-blue-400 to-blue-700 
                    bg-clip-text font-bold"
                >
                  {user.username}
                </span>

                <ToggleTheme />

                <button
                  onClick={() => setIsOpen(true)}
                  className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 
                               rounded-full p-2 transition"
                >
                  <UserRound
                    size={18}
                    className="text-gray-700 dark:text-gray-200"
                  />
                </button>

                <button
                  onClick={() => setIsOpen(true)}
                  className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 
                               rounded-full p-2 transition"
                >
                  <LogOut
                    onClick={Logout}
                    size={18}
                    className="text-gray-700 dark:text-gray-200"
                  />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <Link to={"/login"}>
                  <button
                    className="flex items-center gap-1 bg-green-600 hover:bg-green-700 
                         text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    <LogIn size={16} />
                    Login
                  </button>
                </Link>

                <Link to={"/signup"}>
                  <button
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 
                         text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    <UserRound size={16} />
                    Signup
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {isOpen && <Profile onClose={() => setIsOpen(false)} />}
    </header>
  );
};

export default Header;
