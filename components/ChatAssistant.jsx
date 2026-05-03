"use client";

import React, { useState, useRef, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Send } from "lucide-react";

export default function ChatAssistant() {
  const { user } = useUserContext();
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello! I am VoteGuide AI. How can I help you with the election process today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  const quickReplies = [
    "How do I register?",
    "What ID do I need?",
    "Where is my polling booth?",
    "How does EVM work?"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    
    const userMsg = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, context: user }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessages((prev) => [...prev, { role: "assistant", text: data.response }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", text: "Sorry, I am facing some issues. " + (data.error || "") }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", text: "Network error occurred." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage(input);
    }
  };

  return (
    <Card className="flex flex-col h-[500px] w-full max-w-md mx-auto shadow-xl overflow-hidden border-zinc-200">
      <div className="bg-blue-600 text-white p-4 font-semibold">
        VoteGuide AI Assistant
      </div>
      
      <ScrollArea className="flex-1 p-4 bg-zinc-50" ref={scrollRef}>
        <div className="flex flex-col gap-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[80%] p-3 rounded-lg text-sm ${
                msg.role === "user"
                  ? "bg-blue-500 text-white self-end rounded-br-none"
                  : "bg-white border border-zinc-200 text-zinc-800 self-start rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="bg-white border border-zinc-200 text-zinc-800 self-start p-3 rounded-lg rounded-bl-none text-sm animate-pulse">
              Thinking...
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-3 bg-white border-t border-zinc-200">
        <div className="flex flex-wrap gap-2 mb-3">
          {quickReplies.map((reply, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(reply)}
              className="text-xs bg-zinc-100 hover:bg-zinc-200 text-zinc-700 py-1 px-2 rounded-full transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask anything..."
            aria-label="Chat input"
            className="flex-1"
          />
          <Button onClick={() => sendMessage(input)} disabled={isLoading || !input.trim()} aria-label="Send">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
