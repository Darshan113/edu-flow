import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logout } from "../features/auth/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const { isLoggedIn, user, status, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleLogin = () => {
    dispatch(loginUser(form));
  };

  return (
    <div className="border p-6 max-w-xs mx-auto rounded shadow">
      {isLoggedIn ? (
        <div>
          <h3 className="mb-2">Welcome, {user} 🎉</h3>
          <button
            className="bg-gray-700 text-white px-3 py-1 rounded"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h3 className="mb-2 font-semibold">Login</h3>
          <input
            className="border p-2 w-full mb-2"
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            className="border p-2 w-full mb-2"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded w-full"
            onClick={handleLogin}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
}
