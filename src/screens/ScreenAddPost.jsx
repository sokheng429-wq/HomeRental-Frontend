import React, { useState } from "react";
import { ChevronLeft, Building2, Camera } from "lucide-react";
import { COLORS } from "../theme.js";
import BottomNav from "../components/BottomNav.jsx";
import { createListing } from "../api.js";

const EMPTY_FORM = { type: "", location: "", floor: "", rent: "", desc: "", phone: "" };

export default function ScreenAddPost({ go }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handlePost = async () => {
    setError("");
    if (!form.type || !form.location || !form.rent) {
      setError("Please fill in type, location, and monthly rent.");
      return;
    }
    setSaving(true);
    try {
      await createListing({
        type: form.type,
        location: form.location,
        floor: form.floor ? parseInt(form.floor, 10) : null,
        rent: parseFloat(form.rent),
        description: form.desc || undefined,
        owner_phone: form.phone || undefined,
      });
      setForm(EMPTY_FORM);
      go("home");
    } catch (err) {
      setError(err.message || "Could not create the listing.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="hr-screen">
      <div className="hr-profile-header short">
        <button className="hr-iconbtn on-navy" onClick={() => go("home")}>
          <ChevronLeft size={18} color="#fff" />
        </button>
        <span className="hr-header-title on-navy">New Post</span>
        <span style={{ width: 32 }} />
      </div>

      <div className="hr-form-body">
        <div className="hr-form-heading">Property Details</div>
        <input className="hr-input navy" placeholder="Apartment / Condo / Studio" value={form.type} onChange={set("type")} />
        <input className="hr-input navy" placeholder="Location" value={form.location} onChange={set("location")} />
        <input className="hr-input navy" placeholder="Floor" value={form.floor} onChange={set("floor")} />
        <input className="hr-input navy" placeholder="Monthly Rent" value={form.rent} onChange={set("rent")} />
        <input className="hr-input navy" placeholder="Owner phone (for the chat bot)" value={form.phone} onChange={set("phone")} />

        <div className="hr-form-heading">Add Photo</div>
        <div className="hr-photo-row">
          <div className="hr-photo-tile filled">
            <Building2 size={20} color="#fff" />
          </div>
          <button className="hr-photo-tile">
            <Camera size={18} color={COLORS.navy} />
            <span className="hr-photo-more">More</span>
          </button>
        </div>

        <div className="hr-form-heading">Description</div>
        <textarea
          className="hr-textarea"
          placeholder="Add description"
          value={form.desc}
          onChange={set("desc")}
          rows={4}
        />

        {error && <div className="hr-form-error">{error}</div>}

        <button className="hr-btn-navy" onClick={handlePost} disabled={saving}>
          {saving ? "Posting…" : "Post"}
        </button>
      </div>

      <BottomNav screen="addPost" go={go} />
    </div>
  );
}
