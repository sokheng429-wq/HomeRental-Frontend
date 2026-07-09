import React, { useEffect, useState } from "react";
import { Search, User } from "lucide-react";
import { COLORS } from "../theme.js";
import { getListings } from "../api.js";
import ListingCard from "../components/ListingCard.jsx";
import ListingRow from "../components/ListingRow.jsx";

const TABS = ["All", "Apartment", "Condo", "Studio"];

function toViewModel(listing) {
  return {
    id: listing.id,
    title: listing.title,
    price: `$${Math.round(listing.rent)}/MONTH`,
    location: listing.location,
    floor: listing.floor ?? "-",
    tint: listing.tint || "#5b6bd6",
  };
}

export default function ScreenHome({ user, go }) {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    getListings({ search: search.trim() || undefined, type: tab })
      .then((data) => {
        if (!cancelled) setListings(data.map(toViewModel));
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Could not load listings.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tab, search]);

  const isFiltered = tab !== "All" || search.trim().length > 0;
  const featured = isFiltered ? [] : listings.slice(0, 2);
  const nearby = isFiltered ? [] : listings.slice(2, 3);
  const popular = isFiltered ? listings : listings.slice(3);

  return (
    <div className="hr-screen">
      <div className="hr-home-header">
        <div className="hr-home-toprow">
          <div>
            <div className="hr-home-greet">Good day 👋</div>
            <div className="hr-home-name">{user.name || "Guest"} · Home Rental</div>
          </div>
          <button className="hr-avatar-btn" onClick={() => go("profile")}>
            <User size={18} color={COLORS.navy} />
          </button>
        </div>

        <div className="hr-search">
          <Search size={15} color={COLORS.muted} />
          <input
            className="hr-search-input"
            style={{ border: "none", outline: "none", background: "transparent", flex: 1 }}
            placeholder="Search location, property..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="hr-tabs">
          {TABS.map((t) => (
            <button key={t} className={"hr-tab" + (tab === t ? " active" : "")} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="hr-home-body">
        {loading && <div className="hr-loading-text">Loading listings…</div>}
        {!loading && error && <div className="hr-form-error">{error}</div>}

        {!loading && !error && (
          <>
            {isFiltered ? (
              <>
                <div className="hr-section-row">
                  <span className="hr-section-title">Results</span>
                </div>
                {popular.length === 0 && <div className="hr-empty-text">No listings match your search.</div>}
                {popular.map((l) => (
                  <ListingRow key={l.id} item={l} />
                ))}
              </>
            ) : (
              <>
                {featured.length > 0 && (
                  <>
                    <div className="hr-section-row">
                      <span className="hr-section-title">Featured Lists</span>
                    </div>
                    <div className="hr-grid-2">
                      {featured.map((l) => (
                        <ListingCard key={l.id} item={l} />
                      ))}
                    </div>
                  </>
                )}

                {nearby.length > 0 && (
                  <>
                    <div className="hr-section-row">
                      <span className="hr-section-title">Nearby</span>
                    </div>
                    {nearby.map((l) => (
                      <ListingRow key={l.id} item={l} />
                    ))}
                  </>
                )}

                {popular.length > 0 && (
                  <>
                    <div className="hr-section-row">
                      <span className="hr-section-title">Popular</span>
                    </div>
                    {popular.map((l) => (
                      <ListingRow key={l.id} item={l} />
                    ))}
                  </>
                )}

                {listings.length === 0 && (
                  <div className="hr-empty-text">No listings yet — be the first to add one!</div>
                )}
              </>
            )}
          </>
        )}

        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}
