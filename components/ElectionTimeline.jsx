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
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-200">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-zinc-800">Your Progress</h2>
          <span className="text-blue-600 font-bold">{progress}%</span>
        </div>
        <div className="w-full bg-zinc-100 rounded-full h-3">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-in-out" 
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
              className={`border-l-4 transition-all duration-300 ${isCompleted ? 'border-l-green-500 bg-green-50/30' : 'border-l-blue-500 hover:border-l-blue-600'}`}
            >
              <CardHeader 
                className="cursor-pointer flex flex-row items-center justify-between p-4"
                onClick={() => setExpandedStep(isExpanded ? null : step.id)}
              >
                <div className="flex items-center gap-3">
                  <button 
                    onClick={(e) => toggleComplete(step.id, e)}
                    aria-label={`Mark step ${step.id} complete`}
                    className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-zinc-300 hover:text-blue-400" />
                    )}
                  </button>
                  <CardTitle className={`text-lg ${isCompleted ? 'text-zinc-500 line-through' : 'text-zinc-800'}`}>
                    {step.id}. {step.title}
                  </CardTitle>
                </div>
                {isExpanded ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
              </CardHeader>
              
              {isExpanded && (
                <CardContent className="pt-0 pb-4 pl-14 pr-4 animate-in slide-in-from-top-2">
                  <p className="text-zinc-600 mb-4">{step.description}</p>
                  
                  {step.documents.length > 0 && (
                    <div className="bg-blue-50 p-3 rounded-lg mb-4 border border-blue-100">
                      <h4 className="font-semibold text-blue-800 text-sm mb-2">Required Documents:</h4>
                      <ul className="list-disc pl-5 text-sm text-blue-900 space-y-1">
                        {step.documents.map((doc, idx) => (
                          <li key={idx}>{doc}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button 
                    variant={isCompleted ? "outline" : "default"}
                    onClick={(e) => toggleComplete(step.id, e)}
                    className={isCompleted ? "border-green-500 text-green-600" : "bg-blue-600 hover:bg-blue-700"}
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
