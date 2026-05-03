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
    <Card className="flex flex-col h-[700px] w-full bg-white/70 neo-blur glass-border shadow-neo-glass rounded-[2rem] overflow-hidden transition-all duration-500">
      <div className="bg-slate-900 text-white p-8 font-black tracking-tighter text-2xl flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-4 h-4 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(52,211,153,0.5)]"></div>
          VoteGuide AI
        </div>
        <div className="text-[10px] uppercase tracking-widest font-black bg-white/10 px-4 py-1.5 rounded-full border border-white/10">Active Session</div>
      </div>
      
      <ScrollArea className="flex-1 p-8 overflow-y-auto custom-scrollbar" ref={scrollRef}>
        <div className="flex flex-col gap-8">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[85%] p-6 rounded-3xl text-lg font-bold shadow-sm transition-all duration-500 ${
                msg.role === "user"
                  ? "bg-slate-900 text-white self-end rounded-tr-none shadow-xl shadow-slate-200"
                  : "bg-white glass-border text-slate-800 self-start rounded-tl-none shadow-sm"
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
            <div className="bg-indigo-50/50 backdrop-blur-sm border border-indigo-100 text-indigo-600 font-bold self-start p-6 rounded-3xl rounded-tl-none animate-pulse flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce"></div>
                <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
              </div>
              Thinking...
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-8 bg-white/50 border-t border-white/40">
        <div className="flex flex-wrap gap-3 mb-8">
          {quickReplies.map((reply, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(reply)}
              className="text-xs font-black uppercase tracking-wider bg-white border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 py-3 px-5 rounded-2xl transition-all shadow-sm active:scale-95"
            >
              {reply}
            </button>
          ))}
        </div>
        
        <div className="flex gap-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question..."
            aria-label="Chat input"
            className="flex-1 font-bold text-lg h-16 bg-white rounded-2xl border-slate-200 focus:ring-slate-900 shadow-sm"
          />
          <Button onClick={() => sendMessage(input)} disabled={isLoading || !input.trim()} aria-label="Send" className="h-16 px-10 rounded-2xl bg-slate-900 hover:bg-indigo-600 shadow-xl transition-all">
            <Send className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
