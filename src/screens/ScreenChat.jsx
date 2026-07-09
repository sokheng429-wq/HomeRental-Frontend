import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, User } from "lucide-react";
import BackHeader from "../components/BackHeader.jsx";
import { getChatHistory, sendChatMessage } from "../api.js";

export default function ScreenChat({ go }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    getChatHistory()
      .then((data) => {
        if (!cancelled) setMessages(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Could not load chat history.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setError("");
    setInput("");
    setSending(true);

    // Optimistically show the user's message right away.
    const tempId = `temp-${Date.now()}`;
    setMessages((m) => [...m, { id: tempId, role: "user", text }]);

    try {
      const { bot_message } = await sendChatMessage(text);
      setMessages((m) => [...m, bot_message]);
    } catch (err) {
      setError(err.message || "Message failed to send.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="hr-screen">
      <BackHeader title="AI Chat Bot" onBack={() => go("home")} />

      <div className="hr-chat-body" ref={scrollRef}>
        {loading && <div className="hr-loading-text">Loading conversation…</div>}

        {!loading &&
          messages.map((m) => (
            <div key={m.id} className={"hr-chat-row" + (m.role === "user" ? " me" : "")}>
              {m.role === "bot" && (
                <div className="hr-chat-avatar">
                  <Bot size={14} color="#fff" />
                </div>
              )}
              <div className={"hr-bubble" + (m.role === "user" ? " user" : " bot")}>{m.text}</div>
              {m.role === "user" && (
                <div className="hr-chat-avatar user">
                  <User size={14} color="#fff" />
                </div>
              )}
            </div>
          ))}

        {sending && (
          <div className="hr-chat-row">
            <div className="hr-chat-avatar">
              <Bot size={14} color="#fff" />
            </div>
            <div className="hr-bubble bot">…</div>
          </div>
        )}
      </div>

      {error && <div className="hr-form-error" style={{ margin: "0 14px" }}>{error}</div>}

      <div className="hr-chat-inputrow">
        <input
          className="hr-chat-input"
          type="text"
          inputMode="text"
          enterKeyHint="send"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          placeholder="Type a message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button className="hr-chat-send" onClick={send} disabled={sending}>
          <Send size={16} color="#fff" />
        </button>
      </div>
    </div>
  );
}
