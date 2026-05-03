"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircle, Circle, ChevronDown, ChevronUp } from "lucide-react";

const TIMELINE_STEPS = [
  {
    id: 1,
    title: "Eligibility Check",
    description: "Verify that you meet the age, citizenship, and residency requirements to vote in India.",
    documents: ["Birth Certificate or 10th Standard Marksheet", "Aadhaar Card or Passport"],
  },
  {
    id: 2,
    title: "Voter Registration",
    description: "Register online via the NVSP portal using Form 6, or offline at your local Electoral Registration Office.",
    documents: ["Passport-size Photograph", "Address Proof", "Age Proof"],
  },
  {
    id: 3,
    title: "Voter ID Verification",
    description: "Check your name in the electoral roll and ensure you have your EPIC (Voter ID) card ready.",
    documents: ["EPIC (Voter ID) Card", "Voter Information Slip"],
  },
  {
    id: 4,
    title: "Polling Day Process",
    description: "Go to your assigned polling booth. Verify your ID, press the button on the EVM against your chosen candidate, and check the VVPAT slip.",
    documents: ["EPIC (Voter ID) Card or alternative approved ID (like Aadhaar, PAN)"],
  },
  {
    id: 5,
    title: "Counting & Results",
    description: "EVMs are sealed and secured. Votes are counted on the designated counting day, and results are published by the Election Commission of India.",
    documents: [],
  }
];

export default function ElectionTimeline() {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [expandedStep, setExpandedStep] = useState(1);

  const toggleComplete = (id, e) => {
    e.stopPropagation();
    if (completedSteps.includes(id)) {
      setCompletedSteps(completedSteps.filter(stepId => stepId !== id));
    } else {
      setCompletedSteps([...completedSteps, id]);
      if (expandedStep === id && id < 5) {
        setExpandedStep(id + 1);
      }
    }
  };

  const progress = Math.round((completedSteps.length / 5) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-glass">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Your Progress</h2>
          <span className="text-indigo-600 font-bold text-2xl">{progress}%</span>
        </div>
        <div className="w-full bg-zinc-200/50 rounded-full h-4 overflow-hidden shadow-inner">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {TIMELINE_STEPS.map((step) => {
          const isCompleted = completedSteps.includes(step.id);
          const isExpanded = expandedStep === step.id;

          return (
            <Card 
              key={step.id} 
              className={`border transition-all duration-300 rounded-3xl ${isCompleted ? 'bg-indigo-50/50 border-indigo-100 shadow-glass-sm' : 'bg-white/60 backdrop-blur-xl border-white/40 hover:bg-white/80 shadow-glass'}`}
            >
              <CardHeader 
                className="cursor-pointer flex flex-row items-center justify-between p-6"
                onClick={() => setExpandedStep(isExpanded ? null : step.id)}
              >
                <div className="flex items-center gap-5">
                  <button 
                    onClick={(e) => toggleComplete(step.id, e)}
                    aria-label={`Mark step ${step.id} complete`}
                    className="focus:outline-none shrink-0"
                  >
                    {isCompleted ? (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-md shadow-indigo-500/30 text-white">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-white border border-zinc-300 shadow-inner flex items-center justify-center text-zinc-400 hover:border-indigo-400 hover:text-indigo-400 transition-colors">
                        <Circle className="w-5 h-5" />
                      </div>
                    )}
                  </button>
                  <CardTitle className={`text-xl font-bold tracking-tight ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                    {step.id}. {step.title}
                  </CardTitle>
                </div>
                {isExpanded ? <ChevronUp className="w-6 h-6 text-slate-400" /> : <ChevronDown className="w-6 h-6 text-slate-400" />}
              </CardHeader>
              
              {isExpanded && (
                <CardContent className="pt-0 pb-6 pl-[4.5rem] pr-6 animate-in slide-in-from-top-2">
                  <p className="text-slate-600 font-medium text-lg mb-6 leading-relaxed">{step.description}</p>
                  
                  {step.documents.length > 0 && (
                    <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-100/50 mb-6">
                      <h4 className="font-bold text-slate-800 text-lg mb-3">Required Documents:</h4>
                      <ul className="list-disc pl-5 text-slate-700 font-medium space-y-2">
                        {step.documents.map((doc, idx) => (
                          <li key={idx}>{doc}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button 
                    variant={isCompleted ? "outline" : "default"}
                    onClick={(e) => toggleComplete(step.id, e)}
                    className={`py-6 px-8 rounded-xl font-medium ${isCompleted ? "" : ""}`}
                  >
                    {isCompleted ? "Mark Incomplete" : "Mark Complete"}
                  </Button>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
