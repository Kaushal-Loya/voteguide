"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

const STEPS = [
  {
    title: "Verify Identity",
    desc: "Show your EPIC (Voter ID) to the polling officer.",
    visual: (
      <svg className="w-24 h-24 text-blue-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
      <svg className="w-24 h-24 text-blue-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
      </svg>
    )
  },
  {
    title: "Press the Button",
    desc: "Go to the EVM compartment. Press the blue button against the candidate of your choice.",
    visual: (
      <svg className="w-24 h-24 text-blue-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
      <svg className="w-24 h-24 text-blue-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="6" y="4" width="12" height="16" rx="2" strokeWidth="2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 8h8M8 12h8M8 16h4" />
      </svg>
    )
  }
];

export default function EVMExplainer() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Card className="w-full shadow-lg border-zinc-200">
      <CardHeader className="bg-zinc-50 border-b border-zinc-100">
        <CardTitle className="text-xl text-center">How to use EVM & VVPAT</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center min-h-[250px]">
          <div className="mb-6 animate-in fade-in zoom-in duration-500">
            {STEPS[currentStep].visual}
          </div>
          <h3 className="text-xl font-bold text-zinc-800 mb-2">
            Step {currentStep + 1}: {STEPS[currentStep].title}
          </h3>
          <p className="text-center text-zinc-600 max-w-sm h-16">
            {STEPS[currentStep].desc}
          </p>
        </div>
        
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <div className="flex gap-1 items-center">
            {STEPS.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 w-2 rounded-full ${idx === currentStep ? 'bg-blue-600' : 'bg-zinc-200'}`}
              />
            ))}
          </div>
          <Button 
            onClick={() => setCurrentStep(prev => Math.min(STEPS.length - 1, prev + 1))}
            disabled={currentStep === STEPS.length - 1}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
