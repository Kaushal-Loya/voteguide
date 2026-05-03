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
    <Card className="flex flex-col h-full w-full bg-white/70 neo-blur glass-border shadow-neo-glass rounded-2xl overflow-hidden transition-all duration-500">
      <div className="bg-slate-900 text-white p-5 font-black tracking-tighter text-lg flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(52,211,153,0.5)]"></div>
          VoteGuide AI
        </div>
        <div className="text-[9px] uppercase tracking-widest font-black bg-white/10 px-3 py-1 rounded-full border border-white/10">Active Session</div>
      </div>
      
      <ScrollArea className="flex-1 p-5 overflow-y-auto custom-scrollbar" ref={scrollRef}>
        <div className="flex flex-col gap-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[90%] p-3.5 rounded-xl text-[13px] font-bold shadow-sm transition-all duration-500 border ${
                msg.role === "user"
                  ? "bg-slate-900 text-white self-end rounded-tr-none border-slate-800 shadow-lg shadow-slate-100"
                  : "bg-white border-slate-100 text-slate-800 self-start rounded-tl-none"
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
            <div className="bg-indigo-50/50 backdrop-blur-sm border border-indigo-100 text-indigo-600 font-bold self-start p-3 rounded-xl rounded-tl-none animate-pulse flex items-center gap-2 text-[10px] uppercase tracking-widest">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
              </div>
              Processing
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-6 bg-white/50 border-t border-white/40">

        
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question..."
            aria-label="Chat input"
            className="flex-1 font-bold text-sm h-12 bg-white rounded-xl border-slate-200 focus:ring-slate-900 shadow-sm"
          />
          <Button onClick={() => sendMessage(input)} disabled={isLoading || !input.trim()} aria-label="Send" className="h-12 px-6 rounded-xl bg-slate-900 hover:bg-indigo-600 shadow-xl transition-all">
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
