"use client";

import React, { useState } from "react";

import { useUserContext } from "../context/UserContext";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "te", name: "Telugu" }
];

export default function LanguageSelector() {
  const { user, updateContext, isInitialized } = useUserContext();
  const [loading, setLoading] = useState(false);

  if (!isInitialized) return null;

  const handleLanguageChange = (newLang) => {
    setLoading(true);
    updateContext({ language: newLang });
    
    // Set Google Translate Cookie
    // Format: /pageLanguage/targetLanguage
    const googleTransValue = `/en/${newLang}`;
    document.cookie = `googtrans=${googleTransValue}; path=/`;
    document.cookie = `googtrans=${googleTransValue}; path=/; domain=${window.location.hostname}`;
    
    // Refresh to apply translation
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-2">
    <div className="flex items-center gap-2 relative">
      <select
        value={user.language}
        onChange={(e) => handleLanguageChange(e.target.value)}
        disabled={loading}
        className="w-[120px] py-2 px-4 rounded-xl border border-zinc-200 bg-white/50 backdrop-blur-sm text-slate-800 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer shadow-sm appearance-none transition-all pr-8"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      <div className="absolute right-3 pointer-events-none text-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </div>
    </div>
  );
}
