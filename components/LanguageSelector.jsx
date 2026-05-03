"use client";

import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useUserContext } from "../context/UserContext";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "te", name: "Telugu" }
];

export default function LanguageSelector() {
  const { user, updateContext } = useUserContext();
  const [loading, setLoading] = useState(false);

  const handleLanguageChange = async (newLang) => {
    setLoading(true);
    updateContext({ language: newLang });
    // In a real app, this would trigger a global re-render with translated strings
    // or set a cookie for next-intl/i18n middleware.
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={user.language} onValueChange={handleLanguageChange} disabled={loading}>
        <SelectTrigger className="w-[120px] bg-white border-zinc-200">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          {LANGUAGES.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
