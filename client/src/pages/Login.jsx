import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./../context/UserContext";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { handleUserLogin, loading } = useContext(UserContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUserLogin(form);

    setForm({ email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-stone-900 transition-colors duration-300 px-4">
      <div className="max-w-md w-full bg-white dark:bg-stone-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Log in to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:bg-transparent dark:border-gray-600 dark:text-white"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:bg-transparent dark:border-gray-600 dark:text-white"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-colors 
                      ${
                        loading
                          ? "bg-gray-400 cursor-not-allowed dark:bg-gray-600"
                          : "bg-blue-600 hover:bg-blue-700 dark:bg-red-500 dark:hover:bg-red-600"
                      }`}
          >
            {loading ? "Login..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          Don't have an account?{" "}
          <Link
            to={"/signup"}
            className="text-blue-600 hover:underline dark:text-red-400"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
