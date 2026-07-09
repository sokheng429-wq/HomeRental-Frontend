import React from "react";
import { MapPin } from "lucide-react";
import { COLORS } from "../theme.js";

export default function ScreenLoading() {
  return (
    <div className="hr-screen hr-loading">
      <div className="hr-pins">
        <MapPin size={30} color={COLORS.coral} fill={COLORS.coral} strokeWidth={1} />
        <MapPin size={34} color={COLORS.ink} fill={COLORS.ink} strokeWidth={1} />
        <MapPin size={30} color="none" stroke={COLORS.ink} strokeWidth={1.5} />
      </div>
      <div className="hr-logo">Home Rental</div>
      <div className="hr-spinner" />
    </div>
  );
}
