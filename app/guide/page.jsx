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
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";

export default function GuidePage() {
  const { user } = useUserContext();
  const router = useRouter();
  const [routeDecision, setRouteDecision] = useState("incomplete");

  useEffect(() => {
    const decision = evaluateUser(user);
    if (decision === "incomplete") {
      router.push("/");
    } else {
      setRouteDecision(decision);
    }
  }, [user, router]);

  if (routeDecision === "incomplete") {
    return <div className="min-h-screen flex items-center justify-center">Loading context...</div>;
  }

  return (
    <main className="min-h-screen bg-zinc-50 flex flex-col">
      <header className="w-full bg-white border-b border-zinc-200 py-4 px-6 flex justify-between items-center shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/")} aria-label="Go Back">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">V</div>
            <h1 className="text-xl font-bold text-zinc-900 hidden sm:block">VoteGuide AI</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AddReminderButton />
          <LanguageSelector />
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content Column */}
        <div className="lg:col-span-7 space-y-8">
          
          {routeDecision === "ineligible" && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-500 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-amber-800">You are not yet eligible to vote</h2>
                  <p className="text-amber-700 mt-2">
                    In India, you must be 18 years or older to register and vote. Since you are {user.age}, you cannot vote in the current elections. However, learning the process early is a great step! Check out the timeline below so you're ready when you turn 18.
                  </p>
                </div>
              </div>
            </div>
          )}

          {routeDecision === "register" && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">Let's Get You Registered!</h2>
              <p className="text-blue-700">
                You are eligible to vote but haven't registered yet. Don't worry, the process is simple. Follow the steps below or ask the AI assistant for guidance on filling out Form 6.
              </p>
            </div>
          )}

          {routeDecision === "polling" && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-green-800 mb-2">You're Ready to Vote!</h2>
              <p className="text-green-700">
                Since you're already registered, your main tasks are checking your name in the electoral roll and knowing your polling booth. Check the timeline or map below for details.
              </p>
            </div>
          )}

          <section>
            <h3 className="text-2xl font-bold text-zinc-800 mb-6">Election Process Timeline</h3>
            <ElectionTimeline />
          </section>

          <section>
            <h3 className="text-2xl font-bold text-zinc-800 mb-6 border-t border-zinc-200 pt-8">EVM / VVPAT Guide</h3>
            <EVMExplainer />
          </section>
          
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-5 space-y-8 relative">
          <div className="sticky top-24 space-y-8">
            <ChatAssistant />
            
            {routeDecision === "polling" && (
              <PollingBoothMap state={user.location?.state} district={user.location?.district} />
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
