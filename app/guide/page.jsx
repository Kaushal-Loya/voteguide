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
import { ScrollArea } from "../../components/ui/scroll-area";
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
  X
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
    { id: "assistant", label: "AI Assistant", icon: MessageSquare },
    { id: "timeline", label: "Timeline", icon: Calendar },
    { id: "booth", label: "Find Booth", icon: MapPin, hidden: routeDecision !== "polling" },
    { id: "evm", label: "EVM Guide", icon: Zap },
  ];

  if (!isInitialized || routeDecision === "incomplete") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-medium">Syncing your voting profile...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <header className="lg:hidden w-full bg-white/70 backdrop-blur-xl border-b border-zinc-200/50 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">V</div>
          <h1 className="font-bold text-slate-800">VoteGuide AI</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
          <Menu className="w-6 h-6" />
        </Button>
      </header>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {(isSidebarOpen || true) && (
          <motion.aside 
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            className={`fixed lg:relative z-[60] w-72 h-screen bg-white/70 backdrop-blur-2xl border-r border-zinc-200/50 p-6 flex flex-col transition-all duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">V</div>
                <h1 className="text-xl font-bold text-slate-800 tracking-tight">VoteGuide AI</h1>
              </div>
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
                <X className="w-6 h-6" />
              </Button>
            </div>

            <nav className="flex-1 space-y-2">
              {navItems.filter(item => !item.hidden).map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setActiveSection(item.id); setIsSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${
                      activeSection === item.id 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                        : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="mt-auto pt-8 border-t border-zinc-200/50 space-y-4">
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100/50">
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Your Profile</p>
                <p className="text-sm font-bold text-slate-700 truncate">{user.location.district}, {user.location.state}</p>
              </div>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="w-full justify-start gap-3 text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-2xl"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </Button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[55] lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Desktop Top Header */}
        <header className="hidden lg:flex w-full bg-white/50 backdrop-blur-md border-b border-zinc-200/50 py-4 px-8 justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-800 capitalize">{activeSection.replace('-', ' ')}</h2>
          </div>
          <div className="flex items-center gap-4">
            <AddReminderButton />
            <LanguageSelector />
          </div>
        </header>

        <ScrollArea className="flex-1 bg-slate-50/50">
          <div className="p-6 lg:p-10 max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeSection === "assistant" && (
                  <div className="space-y-8">
                    <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-glass">
                      <div className="flex items-start gap-4">
                        <AlertCircle className="w-8 h-8 text-indigo-600 mt-1" />
                        <div>
                          <h3 className="text-2xl font-bold text-slate-800">Welcome Back!</h3>
                          <p className="text-slate-600 mt-2 font-medium">
                            {routeDecision === "ineligible" && `You are ${user.age} years old. While you can't vote yet, I can help you learn the process!`}
                            {routeDecision === "register" && "You are eligible to vote! Let's get you registered."}
                            {routeDecision === "polling" && "You are all set! I can help you find your booth or explain the EVM."}
                          </p>
                        </div>
                      </div>
                    </div>
                    <ChatAssistant />
                  </div>
                )}

                {activeSection === "timeline" && (
                  <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-8 lg:p-12 shadow-glass">
                    <h3 className="text-3xl font-bold text-slate-800 mb-10">Your Election Roadmap</h3>
                    <ElectionTimeline />
                  </div>
                )}

                {activeSection === "booth" && (
                  <div className="space-y-8">
                    <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-glass">
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">Find Your Polling Station</h3>
                      <p className="text-slate-600 font-medium">Map view for {user.location.district}, {user.location.state}</p>
                    </div>
                    <div className="h-[600px] rounded-3xl overflow-hidden shadow-glass border border-white/40">
                      <PollingBoothMap state={user.location?.state} district={user.location?.district} />
                    </div>
                  </div>
                )}

                {activeSection === "evm" && (
                  <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-8 lg:p-12 shadow-glass">
                    <h3 className="text-3xl font-bold text-slate-800 mb-10">EVM & VVPAT Guide</h3>
                    <EVMExplainer />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollArea>
      </div>
    </main>
  );
}
