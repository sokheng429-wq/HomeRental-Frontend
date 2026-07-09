// NOTE: superseded by the FastAPI backend (see /backend + src/api.js).
// Kept here only for reference; ScreenHome now fetches real listings
// from GET /listings instead of this static data.
//
// Sample property listings shown on the Home screen.
// Swap this out for a real API call to your backend later.
export const LISTINGS = {
  featured: [
    { id: 1, title: "Condo for Rent", price: "$500/MONTH", location: "Boeung Keng Kong", floor: 12, tint: "#f4c95d" },
    { id: 2, title: "Condo for Rent", price: "$650/MONTH", location: "Toul Kork", floor: 9, tint: "#5b6bd6" },
  ],
  nearby: [
    { id: 3, title: "Apartment for Rent", price: "$800/MONTH", location: "Toul Tom Pong", floor: 5, tint: "#3fa7c9" },
  ],
  popular: [
    { id: 4, title: "Apartment for Rent", price: "$350/MONTH", location: "Boeung Keng Kong", floor: 3, tint: "#7d6fd1" },
    { id: 5, title: "Studio for Rent", price: "$250/MONTH", location: "Koh Pich", floor: 2, tint: "#e08a9d" },
  ],
};
