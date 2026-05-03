"use client";

import React, { useState, useRef, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

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
    <Card className="flex flex-col h-[650px] w-full bg-white/60 backdrop-blur-xl border-white/40 shadow-glass rounded-3xl overflow-hidden transition-all duration-300">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 font-bold tracking-tight text-xl flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-sm shadow-emerald-400/50"></div>
          VoteGuide AI Assistant
        </div>
        <div className="text-xs font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">Online</div>
      </div>
      
      <ScrollArea className="flex-1 p-6 overflow-y-auto" ref={scrollRef}>
        <div className="flex flex-col gap-6">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[85%] p-5 rounded-2xl text-lg font-medium shadow-sm transition-all duration-300 ${
                msg.role === "user"
                  ? "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white self-end rounded-tr-none shadow-indigo-200"
                  : "bg-white/80 backdrop-blur-sm text-slate-800 self-start border border-white/40 rounded-tl-none"
              }`}
            >
              <div className="prose prose-slate max-w-none dark:prose-invert leading-relaxed">
                <ReactMarkdown>
                  {msg.text}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="bg-white/40 backdrop-blur-sm border border-white/40 text-slate-500 font-medium self-start p-5 rounded-2xl rounded-tl-none animate-pulse flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
              </div>
              Thinking...
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-6 bg-slate-50/50 backdrop-blur-md border-t border-zinc-200/50">
        <div className="flex flex-wrap gap-2 mb-6">
          {quickReplies.map((reply, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(reply)}
              className="text-sm font-medium bg-white border border-zinc-200 hover:border-indigo-400 hover:bg-indigo-50 text-slate-700 py-2.5 px-4 rounded-xl transition-all shadow-sm active:scale-95"
            >
              {reply}
            </button>
          ))}
        </div>
        
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            aria-label="Chat input"
            className="flex-1 font-medium text-lg h-14 bg-white/80"
          />
          <Button onClick={() => sendMessage(input)} disabled={isLoading || !input.trim()} aria-label="Send" className="h-14 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200">
            <Send className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
