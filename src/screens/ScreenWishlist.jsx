import React from "react";
import { Heart } from "lucide-react";
import { COLORS } from "../theme.js";

export default function ScreenWishlist() {
  return (
    <div className="hr-screen">
      <div className="hr-home-header short">
        <span className="hr-header-title on-navy">Saved List</span>
      </div>
      <div className="hr-empty">
        <Heart size={34} color={COLORS.muted} />
        <div className="hr-empty-title">Nothing saved yet</div>
        <div className="hr-empty-sub">Tap the heart on any listing to save it here.</div>
      </div>
    </div>
  );
}
