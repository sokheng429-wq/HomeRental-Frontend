import React from "react";
import { MapPin, Building2 } from "lucide-react";
import { COLORS } from "../theme.js";

export default function ListingCard({ item }) {
  return (
    <div className="hr-listing-card">
      <div
        className="hr-listing-thumb"
        style={{ background: `linear-gradient(155deg, ${item.tint}, ${COLORS.navyDeep})` }}
      >
        <Building2 size={26} color="#fff" strokeWidth={1.5} />
      </div>
      <div className="hr-listing-body">
        <div className="hr-listing-title">{item.title}</div>
        <div className="hr-listing-price">{item.price}</div>
        <div className="hr-listing-meta">
          <MapPin size={11} /> {item.location}
        </div>
        <div className="hr-listing-meta">Floor: {item.floor}</div>
      </div>
    </div>
  );
}
