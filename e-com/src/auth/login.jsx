import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // login | signup | forgot | reset
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      let res;
      const apiBase = "http://localhost:5000/api/auth";

      if (mode === "signup") {

        res = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });
        navigate("/login");
      } else if (mode === "login") {
        try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Store user info in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/"); // ✅ Navigate to home
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  
      } else if (mode === "forgot") {
        res = await fetch(`${apiBase}/forgot-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        });
      } else if (mode === "reset") {
        res = await fetch(`${apiBase}/reset-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            otp: formData.otp,
            newPassword: formData.newPassword,
          }),
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Request failed");

      setMessage(data.message || "Success");

      if (mode === "login" || mode === "signup") {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else if (mode === "forgot") {
        setMode("reset");
      } else if (mode === "reset") {
        setMode("login");
      }
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          {mode === "signup"
            ? "Sign Up"
            : mode === "login"
            ? "Login"
            : mode === "forgot"
            ? "Forgot Password"
            : "Reset Password"}
        </h2>

        {message && <p className="text-center text-red-500">{message}</p>}

        {mode === "signup" && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        )}

        {mode !== "reset" && (
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        )}

        {mode === "login" || mode === "signup" ? (
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        ) : null}

        {mode === "reset" && (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading
            ? "Please wait..."
            : mode === "signup"
            ? "Sign Up"
            : mode === "login"
            ? "Login"
            : mode === "forgot"
            ? "Send OTP"
            : "Reset Password"}
        </button>

        <div className="text-sm text-center text-gray-600 mt-2">
          {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setMode("login")}
              >
                Login
              </span>
            </>
          ) : mode === "login" ? (
            <>
              Don't have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setMode("signup")}
              >
                Sign Up
              </span>
              <br />
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setMode("forgot")}
              >
                Forgot Password?
              </span>
            </>
          ) : mode === "forgot" ? (
            <>
              Go back to{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setMode("login")}
              >
                Login
              </span>
            </>
          ) : (
            <>
              Go back to{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setMode("login")}
              >
                Login
              </span>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Auth;
