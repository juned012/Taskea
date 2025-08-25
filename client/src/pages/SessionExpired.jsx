import { Link } from "react-router-dom";

const SessionExpired = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Session Expired</h1>
      <p className="text-gray-700 mb-6">
        Your session has expired. Please login again to continue.
      </p>
      <Link
        to="/login"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default SessionExpired;
