"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

const STEPS = [
  {
    title: "Verify Identity",
    desc: "Show your EPIC (Voter ID) to the polling officer.",
    visual: (
      <svg className="w-32 h-32 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="2" />
        <circle cx="8" cy="12" r="3" strokeWidth="2" />
        <path strokeLinecap="round" strokeWidth="2" d="M13 10h4M13 14h4" />
      </svg>
    )
  },
  {
    title: "Ink Application",
    desc: "Officer applies indelible ink on your left forefinger.",
    visual: (
      <svg className="w-32 h-32 text-indigo-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
      </svg>
    )
  },
  {
    title: "Press the Button",
    desc: "Go to the EVM compartment. Press the blue button against the candidate of your choice.",
    visual: (
      <svg className="w-32 h-32 text-blue-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="2" width="16" height="20" rx="2" strokeWidth="2" />
        <rect x="8" y="6" width="8" height="4" rx="1" strokeWidth="2" />
        <circle cx="12" cy="16" r="3" fill="currentColor" />
      </svg>
    )
  },
  {
    title: "Check VVPAT Slip",
    desc: "A printed slip will appear in the VVPAT machine for 7 seconds confirming your choice.",
    visual: (
      <svg className="w-32 h-32 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="6" y="4" width="12" height="16" rx="2" strokeWidth="2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 8h8M8 12h8M8 16h4" />
      </svg>
    )
  }
];

export default function EVMExplainer() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Card className="w-full bg-white/60 backdrop-blur-xl border-white/40 shadow-glass rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8">
        <CardTitle className="text-3xl font-bold text-white text-center tracking-tight">How to use EVM & VVPAT</CardTitle>
      </CardHeader>
      <CardContent className="p-10">
        <div className="flex flex-col items-center min-h-[300px]">
          <div className="mb-10 animate-in fade-in zoom-in duration-500">
            {STEPS[currentStep].visual}
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">
            Step {currentStep + 1}: {STEPS[currentStep].title}
          </h3>
          <p className="text-center text-slate-600 font-medium text-lg max-w-md h-20 leading-relaxed">
            {STEPS[currentStep].desc}
          </p>
        </div>
        
        <div className="flex justify-between items-center mt-10 pt-8 border-t border-zinc-200/50">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="py-6 px-8 rounded-xl font-medium"
          >
            Previous
          </Button>
          <div className="flex gap-3 items-center">
            {STEPS.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 rounded-full transition-all duration-300 ${idx === currentStep ? 'w-8 bg-indigo-600' : 'w-2 bg-zinc-200'}`}
              />
            ))}
          </div>
          <Button 
            onClick={() => setCurrentStep(prev => Math.min(STEPS.length - 1, prev + 1))}
            disabled={currentStep === STEPS.length - 1}
            className="py-6 px-8 rounded-xl font-medium"
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
