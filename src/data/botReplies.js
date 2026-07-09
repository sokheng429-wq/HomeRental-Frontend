// NOTE: superseded by the FastAPI backend's app/chatbot.py, which queries
// real listings from Postgres. Kept here only for reference; ScreenChat now
// calls POST /chat/message instead of this local matcher.
//
// Placeholder "AI" logic for the chat bot screen.
// Replace `botReply` with a real API call to your backend/LLM later, e.g.:
//   const res = await fetch("/api/chat", { method: "POST", body: JSON.stringify({ message: text }) });
const BOT_REPLIES = [
  {
    match: /room|rent|find|look/i,
    reply: "Sure — what part of Phnom Penh are you thinking, and what's your monthly budget?",
  },
  {
    match: /boeung keng kong|bkk|toul tom pong|toul kork|koh pich/i,
    reply: "Got it. I found an apartment for rent, $800/month, in Toul Tom Pong, floor 5. Want the owner's number?",
  },
  {
    match: /number|contact|owner|call/i,
    reply: "Here you go: 855 933456789. Let me know if you'd like me to line up a viewing time too.",
  },
  {
    match: /budget|cheap|affordable|student/i,
    reply: "For a tighter budget, the studio in Koh Pich is $250/month, floor 2 — small but bright, close to the river.",
  },
  {
    match: /hi|hello|hey/i,
    reply: "Hi! I'm here to help you find a room, apartment, or condo in Phnom Penh. What are you looking for?",
  },
];

export function botReply(text) {
  const hit = BOT_REPLIES.find((r) => r.match.test(text));
  if (hit) return hit.reply;
  return "I'll keep that in mind — tell me the neighborhood and budget and I'll pull up some listings.";
}
