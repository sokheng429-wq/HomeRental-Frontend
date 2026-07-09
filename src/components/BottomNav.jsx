import React from "react";
import { Home as HomeIcon, Heart, Plus, MessageCircle, User } from "lucide-react";
import { COLORS } from "../theme.js";

const NAV_ITEMS = [
  { key: "home", icon: HomeIcon },
  { key: "wishlist", icon: Heart },
  { key: "addPost", icon: Plus, primary: true },
  { key: "chat", icon: MessageCircle },
  { key: "profile", icon: User },
];

export default function BottomNav({ screen, go }) {
  return (
    <div className="hr-bottomnav">
      {NAV_ITEMS.map(({ key, icon: Icon, primary }) =>
        primary ? (
          <button key={key} className="hr-nav-fab" onClick={() => go("addPost")} aria-label="Add post">
            <Icon size={20} color={COLORS.navy} strokeWidth={2.5} />
          </button>
        ) : (
          <button
            key={key}
            className={"hr-nav-item" + (screen === key ? " active" : "")}
            onClick={() => go(key)}
            aria-label={key}
          >
            <Icon size={20} strokeWidth={2} />
          </button>
        )
      )}
    </div>
  );
}
