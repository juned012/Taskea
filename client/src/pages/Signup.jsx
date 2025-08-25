import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./../context/UserContext";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { handleUserSignup, loading } = useContext(UserContext);
  const navigate = useNavigate();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log(form);

    const { success, message } = await handleUserSignup(form);

    if (success) {
      alert("Account created successfully!");
      navigate("/login");
    } else {
      alert(message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-stone-900 px-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-stone-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Create an Account
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Sign up to start your journey
        </p>

        <form className="space-y-4" onSubmit={submitForm}>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleInput}
            placeholder="Username"
            autoComplete="username"
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:bg-transparent dark:border-gray-600 dark:text-white"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInput}
            placeholder="Email"
            autoComplete="email"
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:bg-transparent dark:border-gray-600 dark:text-white"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleInput}
            placeholder="Password"
            autoComplete="new-password"
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
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline dark:text-red-400"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
