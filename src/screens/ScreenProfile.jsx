import React from "react";
import { ChevronLeft, User, Repeat, LogOut } from "lucide-react";
import { COLORS } from "../theme.js";
import BottomNav from "../components/BottomNav.jsx";

const MENU = [
  { label: "Edit Profile", screen: "editProfile" },
  { label: "Location", screen: "location" },
  { label: "Saved List", screen: "wishlist" },
  { label: "Privacy and Security", screen: "security" },
];

export default function ScreenProfile({ user, go, logout }) {
  const locationLabel = user.province
    ? user.province
        .split("-")
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(" ") + (user.area ? ` · ${user.area}` : "")
    : "Not set";

  return (
    <div className="hr-screen">
      <div className="hr-profile-header">
        <button className="hr-iconbtn on-navy" onClick={() => go("home")}>
          <ChevronLeft size={18} color="#fff" />
        </button>
        <div className="hr-profile-avatar">
          <User size={30} color={COLORS.navy} />
        </div>
        <div className="hr-profile-name">{user.name || "Guest"}</div>
        {user.province && <div className="hr-profile-sub">{locationLabel}, Cambodia</div>}
      </div>

      <div className="hr-profile-body">
        {MENU.map((m) => (
          <button key={m.label} className="hr-menu-row" onClick={() => go(m.screen)}>
            {m.label}
            {m.label === "Location" && <span className="hr-menu-row-value">{locationLabel}</span>}
          </button>
        ))}

        <div style={{ flex: 1 }} />

        <button className="hr-btn-sky" onClick={() => {}}>
          <Repeat size={15} style={{ marginRight: 6 }} />
          Switch Account
        </button>
        <button className="hr-btn-coral" onClick={() => (logout ? logout() : go("login"))}>
          <LogOut size={15} style={{ marginRight: 6 }} />
          Log Out
        </button>
      </div>

      <BottomNav screen="profile" go={go} />
    </div>
  );
}
