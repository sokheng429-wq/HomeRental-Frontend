import React, { useState } from "react";
import { ShieldCheck, KeyRound, Smartphone, Eye, Trash2, ChevronRight } from "lucide-react";
import { COLORS } from "../theme.js";
import BackHeader from "../components/BackHeader.jsx";

function ToggleRow({ icon, title, subtitle, checked, onChange }) {
  return (
    <div className="hr-toggle-row">
      <div className="hr-toggle-icon">{icon}</div>
      <div className="hr-toggle-text">
        <div className="hr-toggle-title">{title}</div>
        {subtitle && <div className="hr-toggle-subtitle">{subtitle}</div>}
      </div>
      <button
        className={"hr-switch" + (checked ? " on" : "")}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
      >
        <span className="hr-switch-knob" />
      </button>
    </div>
  );
}

export default function ScreenSecurity({ user, go }) {
  const [settings, setSettings] = useState({
    twoFactor: false,
    biometric: true,
    showPhone: true,
    showLocation: false,
  });

  const set = (k) => (v) => setSettings((s) => ({ ...s, [k]: v }));

  return (
    <div className="hr-screen">
      <BackHeader title="Privacy and Security" onBack={() => go("profile")} />

      <div className="hr-form-body">
        <div className="hr-form-heading">Login &amp; Access</div>

        <button className="hr-menu-row with-icon" onClick={() => go("editProfile")}>
          <KeyRound size={15} color={COLORS.navy} />
          <span>Change Password</span>
          <ChevronRight size={15} color={COLORS.muted} style={{ marginLeft: "auto" }} />
        </button>

        <ToggleRow
          icon={<ShieldCheck size={15} color={COLORS.navy} />}
          title="Two-Factor Authentication"
          subtitle="Verify with an SMS code on new devices"
          checked={settings.twoFactor}
          onChange={set("twoFactor")}
        />

        <ToggleRow
          icon={<Smartphone size={15} color={COLORS.navy} />}
          title="Biometric Login"
          subtitle="Use Face ID / fingerprint to sign in"
          checked={settings.biometric}
          onChange={set("biometric")}
        />

        <div className="hr-form-heading">Privacy</div>

        <ToggleRow
          icon={<Eye size={15} color={COLORS.navy} />}
          title="Show Phone Number"
          subtitle="Let renters/owners see your number on posts"
          checked={settings.showPhone}
          onChange={set("showPhone")}
        />

        <ToggleRow
          icon={<Eye size={15} color={COLORS.navy} />}
          title="Show My Location"
          subtitle="Display your province on your public profile"
          checked={settings.showLocation}
          onChange={set("showLocation")}
        />

        <div className="hr-form-heading">Account</div>

        <button
          className="hr-menu-row with-icon danger"
          onClick={() => {
            // TODO: wire to a real "delete account" confirmation + API call
          }}
        >
          <Trash2 size={15} color={COLORS.coral} />
          <span>Delete Account</span>
          <ChevronRight size={15} color={COLORS.muted} style={{ marginLeft: "auto" }} />
        </button>
      </div>
    </div>
  );
}
