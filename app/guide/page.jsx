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
          className="absolute w-[500px] h-[500px] bg-indigo-200/30 blur-[120px] rounded-full transition-all duration-1000"
        />
        <motion.div 
          animate={{ 
            x: activeSection === "timeline" ? "20%" : "10%",
            y: activeSection === "timeline" ? "80%" : "10%",
          }}
          className="absolute w-[400px] h-[400px] bg-blue-200/30 blur-[100px] rounded-full transition-all duration-1000"
        />
      </div>

      {/* Mobile Nav */}
      <header className="lg:hidden w-[calc(100%-2rem)] mx-auto mt-4 mb-2 neo-blur bg-white/70 glass-border py-4 px-6 rounded-3xl flex justify-between items-center sticky top-4 z-[100] shadow-neo-glass">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">V</div>
          <h1 className="font-bold text-slate-800 tracking-tight">VoteGuide AI</h1>
        </div>
        <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => setIsSidebarOpen(true)}>
          <Menu className="w-6 h-6" />
        </Button>
      </header>

      {/* Unique Floating Side Dock (Desktop) */}
      <aside className="hidden lg:flex w-24 h-screen py-8 flex-col items-center sticky top-0 z-50">
        <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-indigo-200 mb-12 animate-float">V</div>
        
        <div className="flex-1 flex flex-col gap-6">
          {navItems.filter(item => !item.hidden).map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 relative z-10 ${
                    isActive 
                      ? 'bg-white text-indigo-600 shadow-neo-glass scale-110' 
                      : 'bg-white/40 text-slate-500 hover:bg-white hover:text-indigo-500'
                  }`}
                >
                  <Icon className={`w-6 h-6 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                </button>
                
                {/* Tooltip Label */}
                <div className="absolute left-20 top-1/2 -translate-y-1/2 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-xl">
                  {item.label}
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                </div>
              </div>
            );
          })}
        </div>

        <button 
          onClick={handleLogout}
          className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center shadow-sm"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden lg:pr-8 lg:py-8">
        <div className="flex-1 neo-blur bg-white/60 glass-border rounded-[2.5rem] flex flex-col shadow-neo-glass overflow-hidden relative">
          
          {/* Dashboard Header */}
          <header className="py-6 px-10 flex justify-between items-center border-b border-white/40">
            <div className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full animate-pulse ${navItems.find(i => i.id === activeSection)?.color}`} />
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight capitalize">
                {activeSection} <span className="text-slate-400 font-medium">/ Workspace</span>
              </h2>
            </div>
            <div className="flex items-center gap-6">
               <div className="hidden sm:block text-right">
                  <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Active Profile</p>
                  <p className="text-sm font-bold text-slate-700">{user.location.district}, {user.location.state}</p>
               </div>
               <AddReminderButton />
               <LanguageSelector />
            </div>
          </header>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-8 lg:p-12 max-w-5xl mx-auto min-h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="pb-20"
                >
                  {activeSection === "assistant" && (
                    <div className="space-y-10">
                      <div className="relative p-1 bg-gradient-to-tr from-indigo-500 to-blue-500 rounded-[2rem] shadow-xl">
                        <div className="bg-white/90 backdrop-blur-md rounded-[1.9rem] p-8">
                          <div className="flex items-start gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                              <AlertCircle className="w-8 h-8" />
                            </div>
                            <div>
                              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Active Context</h3>
                              <p className="text-slate-600 mt-2 font-bold leading-relaxed text-lg">
                                {routeDecision === "ineligible" && `Voter Age: ${user.age}. Journey: Educational & Future Readiness.`}
                                {routeDecision === "register" && "Journey: New Voter Registration & Eligibility."}
                                {routeDecision === "polling" && "Journey: Polling Day Logistics & EVM Familiarization."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ChatAssistant />
                    </div>
                  )}

                  {activeSection === "timeline" && (
                    <div className="space-y-10">
                       <div className="flex flex-col gap-2">
                          <h3 className="text-4xl font-black text-slate-900 tracking-tighter">Roadmap</h3>
                          <p className="text-slate-500 font-bold">Your step-by-step guide to the 2024 Election cycle.</p>
                       </div>
                       <div className="bg-white/80 p-10 rounded-[2.5rem] shadow-neo-glass glass-border">
                          <ElectionTimeline />
                       </div>
                    </div>
                  )}

                  {activeSection === "booth" && (
                    <div className="space-y-10">
                      <div className="flex items-center justify-between">
                         <div>
                            <h3 className="text-4xl font-black text-slate-900 tracking-tighter">Booth Finder</h3>
                            <p className="text-slate-500 font-bold">Locating polling stations in {user.location.district}.</p>
                         </div>
                         <div className="bg-indigo-50 px-6 py-3 rounded-2xl border border-indigo-100 font-bold text-indigo-600 flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            Live Map
                         </div>
                      </div>
                      <div className="h-[650px] rounded-[2.5rem] overflow-hidden shadow-neo-glass border border-white/60 relative">
                         <div className="absolute top-6 left-6 z-10 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl glass-border font-bold text-xs shadow-lg">
                            {user.location.state} / {user.location.district}
                         </div>
                        <PollingBoothMap state={user.location?.state} district={user.location?.district} />
                      </div>
                    </div>
                  )}

                  {activeSection === "evm" && (
                    <div className="space-y-10">
                      <div className="flex flex-col gap-2">
                          <h3 className="text-4xl font-black text-slate-900 tracking-tighter">EVM Explainer</h3>
                          <p className="text-slate-500 font-bold">Master the technology behind your vote.</p>
                       </div>
                      <div className="bg-white/80 p-10 rounded-[2.5rem] shadow-neo-glass glass-border">
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
