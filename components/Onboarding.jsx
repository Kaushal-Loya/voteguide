"use client";

import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, MapPin, CheckSquare, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import locationData from "../lib/locationData.json";
import { toast } from "sonner";

export default function Onboarding() {
  const { user, session, updateContext, updateSession } = useUserContext();
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [age, setAge] = useState(user.age || "");
  const [state, setState] = useState(user.location.state || "");
  const [district, setDistrict] = useState(user.location.district || "");
  const [isRegistered, setIsRegistered] = useState(user.isRegistered); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const states = [...locationData.states].map(s => s.state).sort();
  const districts = state ? [...(locationData.states.find(s => s.state === state)?.districts || [])].sort() : [];

  const handleNext = () => {
    if (step === 1 && age) setStep(2);
    else if (step === 2 && state && district) setStep(3);
    else if (step === 3 && isRegistered !== null) {
      setIsSubmitting(true);
      updateContext({
        age: parseInt(age, 10),
        location: { state, district },
        isRegistered,
      });
      updateSession({ isLoggedIn: true });
      toast.success("Profile Created!", {
        description: "Welcome to VoteGuide AI. Redirecting to your dashboard...",
      });
      setTimeout(() => {
        router.push("/guide");
      }, 1500);
    }
  };

  const handleBack = () => setStep(step - 1);

  const slideVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full max-w-2xl mx-auto">
      <div className="w-full relative z-10 rounded-3xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-glass p-8 sm:p-12 mb-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-md shadow-indigo-500/30 mb-6">
            <span className="text-3xl font-bold text-white tracking-tighter">VG</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Create Your Profile</h1>
          <p className="text-lg text-slate-500 mt-2">Just a few details to personalize your voting experience.</p>
        </div>

        <div className="relative">
          {/* Progress Indicators */}
          <div className="flex justify-center gap-3 mb-10">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`h-2 rounded-full transition-all duration-500 ${
                  s === step ? 'w-12 bg-indigo-600' : s < step ? 'w-8 bg-indigo-300' : 'w-8 bg-zinc-200'
                }`}
              />
            ))}
          </div>
          
          <div className="min-h-[320px] flex flex-col justify-center relative">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="space-y-8">
                  <div className="flex items-center gap-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 p-5 mb-6">
                    <User className="w-8 h-8 text-indigo-600" />
                    <h2 className="text-2xl font-semibold text-slate-800">Basic Info</h2>
                  </div>
                  <div className="space-y-4">
                    <label className="block text-lg font-medium text-slate-700">How old are you?</label>
                    <Input 
                      type="number" 
                      placeholder="e.g. 21" 
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      min="1" max="120"
                      className="text-2xl py-6 font-medium text-center"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && age) handleNext();
                      }}
                    />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="space-y-8">
                  <div className="flex items-center gap-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 p-5 mb-6">
                    <MapPin className="w-8 h-8 text-blue-600" />
                    <h2 className="text-2xl font-semibold text-slate-800">Your Location</h2>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="block text-lg font-medium text-slate-700">State</label>
                      <select
                        value={state}
                        onChange={(e) => { setState(e.target.value); setDistrict(""); }}
                        className="w-full py-3 px-4 rounded-2xl border border-zinc-200 bg-white/50 backdrop-blur-sm text-slate-800 font-medium text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer shadow-inner appearance-none transition-all"
                      >
                        <option value="" disabled>Select your state</option>
                        {states.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-lg font-medium text-slate-700">District</label>
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        disabled={!state}
                        className="w-full py-3 px-4 rounded-2xl border border-zinc-200 bg-white/50 backdrop-blur-sm text-slate-800 font-medium text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer shadow-inner appearance-none transition-all disabled:opacity-50 disabled:bg-zinc-100"
                      >
                        <option value="" disabled>Select your district</option>
                        {districts.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="space-y-8">
                  <div className="flex items-center gap-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 p-5 mb-6">
                    <CheckSquare className="w-8 h-8 text-emerald-600" />
                    <h2 className="text-2xl font-semibold text-slate-800">Voter Status</h2>
                  </div>
                  <div className="space-y-4">
                    <label className="block text-lg font-medium text-slate-700">Are you registered to vote?</label>
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        variant={isRegistered === true ? "default" : "outline"}
                        className={`py-8 text-lg rounded-2xl ${isRegistered === true ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0' : ''}`}
                        onClick={() => setIsRegistered(true)}
                      >
                        Yes
                      </Button>
                      <Button 
                        variant={isRegistered === false ? "default" : "outline"}
                        className={`py-8 text-lg rounded-2xl ${isRegistered === false ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white border-0' : ''}`}
                        onClick={() => setIsRegistered(false)}
                      >
                        No
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-10 flex justify-between items-center border-t border-zinc-200/50 pt-8">
            {step > 1 ? (
              <Button 
                variant="ghost" 
                onClick={handleBack}
                className="font-medium text-base py-6 px-6"
              >
                <ArrowLeft className="w-5 h-5 mr-2" /> Back
              </Button>
            ) : <div />}
            
            <Button 
              onClick={handleNext} 
              disabled={isSubmitting || (step === 1 && !age) || (step === 2 && (!state || !district)) || (step === 3 && isRegistered === null)}
              className="py-6 px-8 rounded-2xl text-lg font-medium"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Loading...
                </>
              ) : (
                <>
                  {step === 3 ? 'Get My Guide' : 'Continue'} <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-slate-400 mt-4">
        We do not store or collect any Personally Identifiable Information (PII).
      </p>
    </div>
  );
}
