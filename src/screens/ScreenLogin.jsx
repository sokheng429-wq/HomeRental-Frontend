import React, { useState } from "react";
import { login, setToken } from "../api.js";

export default function ScreenLogin({ go, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      const data = await login({ email, password });
      setToken(data.access_token);
      setUser(data.user);
      go("home");
    } catch (err) {
      setError(err.message || "Could not sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hr-screen hr-auth">
      <div className="hr-sun" />
      <div className="hr-auth-body">
        <h1 className="hr-auth-title">Login</h1>

        <label className="hr-label">Email</label>
        <input
          className="hr-input"
          placeholder="yourname@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
        />

        <label className="hr-label">Password</label>
        <input
          className="hr-input"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
        />

        {error && <div className="hr-form-error">{error}</div>}

        <button className="hr-btn-dark" onClick={handleSignIn} disabled={loading}>
          {loading ? "Signing In…" : "Sign In"}
        </button>

        <div className="hr-auth-switch">
          Don't have an account?{" "}
          <span className="hr-link" onClick={() => go("signup")}>
            Register
          </span>
        </div>
      </div>
    </div>
  );
}
