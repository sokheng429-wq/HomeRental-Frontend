import React from "react";
import { MapPin, Building2 } from "lucide-react";
import { COLORS } from "../theme.js";

export default function ListingRow({ item }) {
  return (
    <div className="hr-list-row">
      <div
        className="hr-listing-thumb small"
        style={{ background: `linear-gradient(155deg, ${item.tint}, ${COLORS.navyDeep})` }}
      >
        <Building2 size={18} color="#fff" strokeWidth={1.5} />
      </div>
      <div className="hr-listing-body">
        <div className="hr-listing-title">{item.title}</div>
        <div className="hr-listing-price">{item.price}</div>
        <div className="hr-listing-meta">
          <MapPin size={11} /> {item.location} · Floor {item.floor}
        </div>
      </div>
    </div>
  );
}
