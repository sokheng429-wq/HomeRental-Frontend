import React from "react";
import { ChevronLeft } from "lucide-react";

export default function BackHeader({ title, onBack }) {
  return (
    <div className="hr-header">
      <button className="hr-iconbtn" onClick={onBack} aria-label="Back">
        <ChevronLeft size={18} />
      </button>
      <span className="hr-header-title">{title}</span>
      <span style={{ width: 32 }} />
    </div>
  );
}
