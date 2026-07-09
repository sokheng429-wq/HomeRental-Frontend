import React, { useState } from "react";
import { User, Pencil } from "lucide-react";
import { COLORS } from "../theme.js";
import BackHeader from "../components/BackHeader.jsx";
import { updateMe } from "../api.js";

export default function ScreenEditProfile({ user, setUser, go }) {
  const [form, setForm] = useState({
    name: user.name || "",
    phone: user.phone || "",
    address: "",
    idCard: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      // Note: address/idCard aren't stored in the backend yet — only
      // name and phone persist. Add columns + fields to wire those up too.
      const updated = await updateMe({ name: form.name, phone: form.phone });
      setUser((u) => ({ ...u, ...updated }));
      go("profile");
    } catch (err) {
      setError(err.message || "Could not save profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="hr-screen">
      <BackHeader title="Profile" onBack={() => go("profile")} />

      <div className="hr-editprofile-hero">
        <div className="hr-profile-avatar light">
          <User size={26} color={COLORS.navy} />
        </div>
        <button className="hr-edit-pencil">
          <Pencil size={12} color={COLORS.navy} />
        </button>
      </div>

      <div className="hr-form-body">
        <label className="hr-label">Name</label>
        <input className="hr-input" value={form.name} onChange={set("name")} />

        <label className="hr-label">Phone Number</label>
        <input className="hr-input" value={form.phone} onChange={set("phone")} placeholder="+855 ..." />

        <label className="hr-label">Address</label>
        <input className="hr-input" value={form.address} onChange={set("address")} placeholder="Street, Sangkat, Khan" />

        <label className="hr-label">ID Card</label>
        <input className="hr-input" value={form.idCard} onChange={set("idCard")} placeholder="ID number" />

        {error && <div className="hr-form-error">{error}</div>}

        <button className="hr-btn-navy" onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}
