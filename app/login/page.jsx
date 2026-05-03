"use client";

import Onboarding from "../../components/Onboarding";
import LanguageSelector from "../../components/LanguageSelector";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col font-sans bg-slate-50 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/30 blur-[100px] animate-blob" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/30 blur-[100px] animate-blob animation-delay-2000" />

      <header className="w-full bg-white/70 backdrop-blur-xl border-b border-zinc-200/50 py-4 px-6 flex justify-between items-center shadow-sm z-50 sticky top-0">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors mr-2">
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-indigo-500/30">
            V
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">VoteGuide AI</h1>
        </div>
        <div className="rounded-2xl bg-white/50 backdrop-blur-sm border border-zinc-200 shadow-sm">
          <LanguageSelector />
        </div>
      </header>
      
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center relative z-10">
        <Onboarding />
      </div>

      <footer className="w-full py-8 border-t border-zinc-200/50 bg-white/50 backdrop-blur-md text-center text-zinc-500 text-sm relative z-10">
        Built for Hack2Skill Virtual PromptWars
      </footer>
    </main>
  );
}
