"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "../../context/UserContext";
import { evaluateUser } from "../../lib/decisionEngine";
import ElectionTimeline from "../../components/ElectionTimeline";
import ChatAssistant from "../../components/ChatAssistant";
import PollingBoothMap from "../../components/PollingBoothMap";
import AddReminderButton from "../../components/AddReminderButton";
import LanguageSelector from "../../components/LanguageSelector";
import EVMExplainer from "../../components/EVMExplainer";
import { 
  AlertCircle, 
  ArrowLeft, 
  LayoutDashboard, 
  MessageSquare, 
  Calendar, 
  MapPin, 
  Zap, 
  LogOut,
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function GuidePage() {
  const { user, session, updateSession, updateContext, isInitialized } = useUserContext();
  const router = useRouter();
  const [routeDecision, setRouteDecision] = useState("incomplete");
  const [activeSection, setActiveSection] = useState("assistant");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isInitialized && !session.isLoggedIn) {
      router.push("/");
      return;
    }
    const decision = evaluateUser(user);
    if (isInitialized && decision === "incomplete") {
      router.push("/login");
    } else {
      setRouteDecision(decision);
    }
  }, [user, session.isLoggedIn, router, isInitialized]);

  const handleLogout = () => {
    updateSession({ isLoggedIn: false, currentStep: 0, completedSteps: [] });
    updateContext({ age: null, location: { state: "", district: "" }, isRegistered: null });
    router.push("/");
  };

  const navItems = [
    { id: "assistant", label: "Assistant", icon: MessageSquare, color: "bg-indigo-500" },
    { id: "timeline", label: "Roadmap", icon: Calendar, color: "bg-blue-500" },
    { id: "booth", label: "Booth", icon: MapPin, color: "bg-emerald-500", hidden: routeDecision !== "polling" },
    { id: "evm", label: "EVM Guide", icon: Zap, color: "bg-amber-500" },
  ];

  if (!isInitialized || routeDecision === "incomplete") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-indigo-100 rounded-full" />
          <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-slate-500 font-bold tracking-tight animate-pulse">Initializing VoteGuide AI...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col lg:flex-row relative overflow-hidden bg-dot-pattern">
      {/* Dynamic Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            x: activeSection === "assistant" ? "10%" : "80%",
            y: activeSection === "assistant" ? "20%" : "70%",
          }}
          className="absolute w-[300px] h-[300px] bg-indigo-200/20 blur-[80px] rounded-full transition-all duration-1000"
        />
        <motion.div 
          animate={{ 
            x: activeSection === "timeline" ? "20%" : "10%",
            y: activeSection === "timeline" ? "80%" : "10%",
          }}
          className="absolute w-[250px] h-[250px] bg-blue-200/20 blur-[70px] rounded-full transition-all duration-1000"
        />
      </div>

      {/* Mobile Nav */}
      <header className="lg:hidden w-[calc(100%-2rem)] mx-auto mt-4 mb-2 neo-blur bg-white/70 glass-border py-3 px-5 rounded-2xl flex justify-between items-center sticky top-4 z-[100] shadow-neo-glass">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">V</div>
          <h1 className="font-bold text-slate-800 tracking-tight text-sm">VoteGuide AI</h1>
        </div>
        <Button variant="ghost" size="icon" className="rounded-lg w-9 h-9" onClick={() => setIsSidebarOpen(true)}>
          <Menu className="w-5 h-5" />
        </Button>
      </header>

      {/* Unique Floating Side Dock (Desktop) */}
      <aside className="hidden lg:flex w-20 h-screen py-6 flex-col items-center sticky top-0 z-50">
        <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-xl shadow-indigo-100 mb-10 animate-float">V</div>
        
        <div className="flex-1 flex flex-col gap-4">
          {navItems.filter(item => !item.hidden).map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 relative z-10 ${
                    isActive 
                      ? 'bg-white text-indigo-600 shadow-neo-glass scale-105' 
                      : 'bg-white/40 text-slate-500 hover:bg-white hover:text-indigo-500'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-105' : 'group-hover:scale-105'}`} />
                </button>
                
                {/* Tooltip Label */}
                <div className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-1 group-hover:translate-x-0 whitespace-nowrap shadow-xl">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>

        <button 
          onClick={handleLogout}
          className="w-11 h-11 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center shadow-sm"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden lg:pr-4 lg:py-4">
        <div className="flex-1 neo-blur bg-white/60 glass-border rounded-2xl flex flex-col shadow-neo-glass overflow-hidden relative">
          
          {/* Dashboard Header */}
          <header className="py-3 px-6 flex justify-between items-center border-b border-white/40">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full animate-pulse ${navItems.find(i => i.id === activeSection)?.color || 'bg-emerald-500'}`} />
              <h2 className="text-lg font-bold text-slate-800 tracking-tight capitalize">
                {activeSection} <span className="text-slate-400 font-medium">/ Workspace</span>
              </h2>
            </div>
            <div className="flex items-center gap-3 scale-90 origin-right">
               <div className="hidden sm:block text-right">
                  <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Active Profile</p>
                  <p className="text-[11px] font-bold text-slate-700">{user.location.district}, {user.location.state}</p>
               </div>
               <AddReminderButton />
               <LanguageSelector />
            </div>
          </header>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-5 lg:p-6 max-w-6xl mx-auto min-h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="pb-10"
                >
                  {activeSection === "assistant" && (
                    <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-140px)]">
                      {/* Left: 82% Chatbot */}
                      <div className="flex-1 lg:flex-[0.82] h-full flex flex-col">
                        <div className="flex-1 min-h-0">
                          <ChatAssistant />
                        </div>
                      </div>
                      
                      {/* Right: 20% Contextual Side Info */}
                      <div className="lg:flex-[0.18] space-y-4">
                        <div className="bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-white/60">
                           <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-3">Quick Context</h3>
                           <div className="space-y-4">
                              <div>
                                 <p className="text-[9px] font-bold text-slate-400 uppercase">Status</p>
                                 <p className="text-xs font-bold text-slate-700">
                                    {routeDecision === "polling" ? "Polling Ready" : routeDecision === "register" ? "Registration" : "Ineligible"}
                                 </p>
                              </div>
                              <div>
                                 <p className="text-[9px] font-bold text-slate-400 uppercase">Assigned Booth</p>
                                 <p className="text-xs font-bold text-slate-700">{user.location.district}</p>
                              </div>
                           </div>
                        </div>
                        <div className="bg-indigo-600 p-4 rounded-2xl text-white shadow-xl">
                           <Zap className="w-5 h-5 mb-2" />
                           <h4 className="text-xs font-black uppercase tracking-wider mb-1">Pro Tip</h4>
                           <p className="text-[10px] font-bold opacity-80 leading-relaxed">You can ask me about EVMs, Voter IDs, or Polling Booths at any time.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === "timeline" && (
                    <div className="space-y-6 max-w-3xl mx-auto">
                       <div className="flex flex-col gap-0.5">
                          <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Roadmap</h3>
                          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-wider">Your step-by-step guide to the 2024 Election cycle.</p>
                       </div>
                       <div className="bg-white/80 p-6 rounded-2xl shadow-neo-glass glass-border">
                          <ElectionTimeline />
                       </div>
                    </div>
                  )}

                  {activeSection === "booth" && (
                    <div className="space-y-6 max-w-4xl mx-auto">
                      <div className="flex items-center justify-between">
                         <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Booth Finder</h3>
                            <p className="text-slate-500 font-bold text-[10px] uppercase tracking-wider">Locating polling stations in {user.location.district}.</p>
                         </div>
                         <div className="bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100 font-bold text-indigo-600 flex items-center gap-2 text-[10px] uppercase tracking-widest">
                            <MapPin className="w-3.5 h-3.5" />
                            Live Map
                         </div>
                      </div>
                      <div className="h-[500px] rounded-2xl overflow-hidden shadow-neo-glass border border-white/60 relative">
                         <div className="absolute top-3 left-3 z-10 bg-white/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg glass-border font-bold text-[9px] shadow-lg">
                            {user.location.state} / {user.location.district}
                         </div>
                        <PollingBoothMap state={user.location?.state} district={user.location?.district} />
                      </div>
                    </div>
                  )}

                  {activeSection === "evm" && (
                    <div className="space-y-6 max-w-3xl mx-auto">
                      <div className="flex flex-col gap-0.5">
                          <h3 className="text-2xl font-black text-slate-900 tracking-tighter">EVM Explainer</h3>
                          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-wider">Master the technology behind your vote.</p>
                       </div>
                      <div className="bg-white/80 p-6 rounded-2xl shadow-neo-glass glass-border">
                        <EVMExplainer />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 h-screen w-80 bg-white z-[120] p-8 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                 <h2 className="text-2xl font-black text-slate-900">Menu</h2>
                 <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                    <X className="w-6 h-6" />
                 </Button>
              </div>
              <nav className="flex-1 space-y-4">
                {navItems.filter(item => !item.hidden).map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setActiveSection(item.id); setIsSidebarOpen(false); }}
                      className={`w-full flex items-center justify-between p-5 rounded-2xl font-bold transition-all ${
                        activeSection === item.id 
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                          : 'bg-slate-50 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <Icon className="w-6 h-6" />
                        {item.label}
                      </div>
                      <ChevronRight className={`w-5 h-5 opacity-50 ${activeSection === item.id ? 'translate-x-1' : ''}`} />
                    </button>
                  );
                })}
              </nav>
              <Button variant="destructive" className="mt-auto rounded-2xl h-14 font-bold gap-3" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
                Sign Out
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
