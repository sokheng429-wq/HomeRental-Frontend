import React, { useMemo, useState } from "react";
import { Search, MapPin, Check, LocateFixed } from "lucide-react";
import { COLORS } from "../theme.js";
import BackHeader from "../components/BackHeader.jsx";
import { CAMBODIA_LOCATIONS, PHNOM_PENH_AREAS } from "../data/cambodiaLocations.js";
import { updateMe } from "../api.js";

export default function ScreenLocation({ user, setUser, go }) {
  const [query, setQuery] = useState("");
  const [province, setProvince] = useState(user.province || "phnom-penh");
  const [area, setArea] = useState(user.area || "");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CAMBODIA_LOCATIONS;
    return CAMBODIA_LOCATIONS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.kh.includes(q)
    );
  }, [query]);

  const handleUseCurrent = () => {
    // TODO: wire to navigator.geolocation + reverse-geocoding on a real backend.
    // Defaults to Phnom Penh since that's where most of the current listings are.
    setProvince("phnom-penh");
  };

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      const updated = await updateMe({ province, area });
      setUser((u) => ({ ...u, ...updated }));
      go("profile");
    } catch (err) {
      setError(err.message || "Could not save location.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="hr-screen">
      <BackHeader title="Location" onBack={() => go("profile")} />

      <div className="hr-form-body">
        <div className="hr-search-light">
          <Search size={15} color={COLORS.muted} />
          <input
            className="hr-search-light-input"
            placeholder="Search province or city…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            enterKeyHint="search"
          />
        </div>

        <button className="hr-current-location" onClick={handleUseCurrent}>
          <LocateFixed size={15} color={COLORS.navy} />
          Use my current location
        </button>

        <div className="hr-form-heading">Country</div>
        <div className="hr-location-row static">
          <MapPin size={15} color={COLORS.navy} />
          <span>Cambodia</span>
          <Check size={15} color={COLORS.navy} style={{ marginLeft: "auto" }} />
        </div>

        <div className="hr-form-heading">Province / City</div>
        <div className="hr-location-list">
          {filtered.map((p) => (
            <button
              key={p.id}
              className={"hr-location-row" + (province === p.id ? " selected" : "")}
              onClick={() => {
                setProvince(p.id);
                setArea("");
              }}
            >
              <MapPin size={15} color={province === p.id ? COLORS.navy : COLORS.muted} />
              <span>
                {p.name}
                <span className="hr-location-kh"> · {p.kh}</span>
              </span>
              {province === p.id && <Check size={15} color={COLORS.navy} style={{ marginLeft: "auto" }} />}
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="hr-empty-sub" style={{ padding: "10px 2px" }}>
              No matching province or city.
            </div>
          )}
        </div>

        {province === "phnom-penh" && (
          <>
            <div className="hr-form-heading">Area in Phnom Penh</div>
            <div className="hr-chip-row">
              {PHNOM_PENH_AREAS.map((a) => (
                <button
                  key={a}
                  className={"hr-chip" + (area === a ? " active" : "")}
                  onClick={() => setArea(a)}
                >
                  {a}
                </button>
              ))}
            </div>
          </>
        )}

        {error && <div className="hr-form-error">{error}</div>}

        <button className="hr-btn-navy" onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save Location"}
        </button>
      </div>
    </div>
  );
}
