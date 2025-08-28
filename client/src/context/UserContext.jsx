import { createContext, useEffect, useState, useRef, useCallback } from "react";
import axios, { all } from "axios";
import api from "../api/tokenExpired";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExpired, setIsExpired] = useState(false);
  const [allTasks, setAllTasks] = useState([]);

  const interceptorRef = useRef(null);

  useEffect(() => {
    interceptorRef.current = api.interceptors.response.use(
      (res) => res,
      (err) => {
        if (
          err.response?.status === 401 &&
          err.response.data.message === "Token expired"
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setToken(null);
          setUser(null);
          setIsExpired(true);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      if (interceptorRef.current) {
        api.interceptors.response.eject(interceptorRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const Logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setIsExpired(false);
  }, []);

  const handleUserSignup = useCallback(async (data) => {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, data);

      return { success: true };
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || "Signup failed",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUserLogin = useCallback(async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        data
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setToken(res.data.token);
      setUser(res.data.user);

      setIsExpired(false);
      return { success: true };
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateTask = useCallback(
    async (taskData) => {
      setLoading(true);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/task/create`,
          taskData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        return { success: true, task: res.data };
      } catch (error) {
        console.error(
          "Create Task error:",
          error.response?.data || error.message
        );
        return {
          success: false,
          message: error.response?.data?.message || "Create Task failed",
        };
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const handleFetchTask = useCallback(async () => {
    try {
      const res = await api.get(`${import.meta.env.VITE_BACKEND_URL}/task/alltask`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const allTasks = res.data.tasks;
      setAllTasks(allTasks);
      return allTasks;
    } catch (error) {
      console.log("Fetch Task error:", error.response?.data || error.message);
    }
  }, [token]);

  const handleStartTask = useCallback(
    async (taskId) => {
      try {
        const res = await api.put(
          `${import.meta.env.VITE_BACKEND_URL}/task/${taskId}/start`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        await handleFetchTask(); // refresh tasks
        return { success: true, task: res.data.task };
      } catch (error) {
        console.error(
          "Start Task error:",
          error.response?.data || error.message
        );
        return {
          success: false,
          message: error.response?.data?.message || "Start task failed",
        };
      }
    },
    [token, handleFetchTask]
  );

  // Pause timer
  const handlePauseTask = useCallback(
    async (taskId) => {
      try {
        const res = await api.put(
          `${import.meta.env.VITE_BACKEND_URL}/task/${taskId}/pause`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        await handleFetchTask();
        return { success: true, task: res.data.task };
      } catch (error) {
        console.error(
          "Pause Task error:",
          error.response?.data || error.message
        );
        return {
          success: false,
          message: error.response?.data?.message || "Pause task failed",
        };
      }
    },
    [token, handleFetchTask]
  );

  // Reset timer
  const handleResetTask = useCallback(
    async (taskId) => {
      try {
        const res = await api.put(
         `${import.meta.env.VITE_BACKEND_URL}/task/${taskId}/reset`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        await handleFetchTask();
        return { success: true, task: res.data.task };
      } catch (error) {
        console.error(
          "Reset Task error:",
          error.response?.data || error.message
        );
        return {
          success: false,
          message: error.response?.data?.message || "Reset task failed",
        };
      }
    },
    [token, handleFetchTask]
  );
  const handleDeleteTask = useCallback(
    async (taskId) => {
      try {
        await api.delete(`${import.meta.env.VITE_BACKEND_URL}/task/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        await handleFetchTask();
        return { success: true };
      } catch (error) {
        console.error(
          "Delete Task error:",
          error.response?.data || error.message
        );
        return {
          success: false,
          message: error.response?.data?.message || "Delete task failed",
        };
      }
    },
    [token, handleFetchTask]
  );

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        Logout,
        handleUserSignup,
        handleUserLogin,
        loading,
        isExpired,
        handleCreateTask,
        handleFetchTask,
        allTasks,
        handleStartTask,  
        handlePauseTask,  
        handleResetTask, 
        handleDeleteTask,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
