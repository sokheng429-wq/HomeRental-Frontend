import React, { useState } from "react";
import { register, setToken } from "../api.js";

export default function ScreenSignup({ go, setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setError("");
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setLoading(true);
    try {
      const data = await register({ name, email, password });
      setToken(data.access_token);
      setUser(data.user);
      go("home");
    } catch (err) {
      setError(err.message || "Could not create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hr-screen hr-auth">
      <div className="hr-sun" />
      <div className="hr-auth-body">
        <h1 className="hr-auth-title">Create Account</h1>

        <label className="hr-label">Name</label>
        <input className="hr-input" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} />

        <label className="hr-label">Email</label>
        <input
          className="hr-input"
          placeholder="yourname@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="hr-label">Password</label>
        <input
          className="hr-input"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="hr-label">Confirm Password</label>
        <input
          className="hr-input"
          type="password"
          placeholder="••••••••"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
        />

        {error && <div className="hr-form-error">{error}</div>}

        <button className="hr-btn-dark" onClick={handleCreate} disabled={loading}>
          {loading ? "Creating…" : "Create Account"}
        </button>

        <div className="hr-auth-switch">
          Already have an account?{" "}
          <span className="hr-link" onClick={() => go("login")}>
            Login
          </span>
        </div>
      </div>
    </div>
  );
}
