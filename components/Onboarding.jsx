"use client";

import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const { updateContext } = useUserContext();
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [age, setAge] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const states = ["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat"];
  const districts = ["District 1", "District 2", "District 3", "District 4"];

  const handleNext = () => {
    if (step === 1 && age) setStep(2);
    if (step === 2 && state && district) setStep(3);
    if (step === 3) {
      updateContext({
        age: parseInt(age, 10),
        location: { state, district },
        isRegistered,
      });
      router.push("/guide");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
      <Card className="w-full max-w-md shadow-lg border-zinc-200">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-blue-700">Welcome to VoteGuide AI</CardTitle>
          <CardDescription className="text-center">
            Let's personalize your election guidance. We do not collect any personally identifiable information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <label className="block text-sm font-medium text-zinc-700">What is your age?</label>
              <Input 
                type="number" 
                min="1" 
                max="120" 
                value={age} 
                onChange={(e) => setAge(e.target.value)} 
                placeholder="Enter your age"
                aria-label="Age"
              />
              <Button onClick={handleNext} disabled={!age} className="w-full bg-blue-600 hover:bg-blue-700">
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <label className="block text-sm font-medium text-zinc-700">Where are you located?</label>
              
              <Select onValueChange={setState} value={state}>
                <SelectTrigger aria-label="State">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  {states.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select onValueChange={setDistrict} value={district} disabled={!state}>
                <SelectTrigger aria-label="District">
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                <Button onClick={handleNext} disabled={!state || !district} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div className="space-y-0.5">
                  <label className="text-base font-medium">Are you registered to vote?</label>
                  <p className="text-sm text-zinc-500">Do you have a valid Voter ID (EPIC)?</p>
                </div>
                <Switch 
                  checked={isRegistered} 
                  onCheckedChange={setIsRegistered} 
                  aria-label="Registration status"
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">Back</Button>
                <Button onClick={handleNext} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Complete Setup
                </Button>
              </div>
            </div>
          )}
          
          <div className="flex justify-center gap-2 mt-6">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-2 w-2 rounded-full ${step >= i ? 'bg-blue-600' : 'bg-zinc-200'}`} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
