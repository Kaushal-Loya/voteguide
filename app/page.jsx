"use client";

import Link from "next/link";
import { useUserContext } from "../context/UserContext";
import LanguageSelector from "../components/LanguageSelector";
import { motion } from "framer-motion";
import { ArrowRight, Bot, MapPin, Calendar, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { Button } from "../components/ui/button";

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-glass hover:shadow-indigo-100/50 transition-all group"
  >
    <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-7 h-7 text-indigo-600" />
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed font-medium">
      {description}
    </p>
  </motion.div>
);

export default function Home() {
  const { session } = useUserContext();

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      {/* Background elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-100/50 blur-[120px] animate-blob" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-100/50 blur-[120px] animate-blob animation-delay-4000" />
      
      <header className="w-full bg-white/70 backdrop-blur-xl border-b border-zinc-200/50 py-4 px-6 flex justify-between items-center shadow-sm z-50 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-indigo-500/30">
            V
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">VoteGuide AI</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block rounded-2xl bg-white/50 backdrop-blur-sm border border-zinc-200 shadow-sm">
            <LanguageSelector />
          </div>
          <Link href={session.isLoggedIn ? "/guide" : "/login"}>
            <Button className="rounded-full px-6 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200">
              {session.isLoggedIn ? "My Dashboard" : "Get Started"}
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-bold mb-8 shadow-sm"
          >
            <Zap className="w-4 h-4 fill-indigo-700" />
            AI-POWERED ELECTION EDUCATION
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-8 leading-[1.1]"
          >
            Navigate Elections with <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Confidence and Clarity.
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-12 font-medium leading-relaxed"
          >
            Your personalized guide to the Indian electoral process. From registration to the polling booth, VoteGuide AI is here to answer all your questions.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href={session.isLoggedIn ? "/guide" : "/login"}>
              <Button size="lg" className="h-16 px-10 text-lg rounded-2xl bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200 group">
                {session.isLoggedIn ? "Go to Dashboard" : "Get My Voter Guide"}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-16 px-10 text-lg rounded-2xl bg-white/50 backdrop-blur-xl border-slate-200">
              Watch Demo
            </Button>
          </motion.div>
        </div>

        {/* Abstract Floating UI elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-40">
           {/* Mockup glass cards */}
           <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[20%] left-[5%] w-64 h-32 rounded-3xl bg-white/40 backdrop-blur-lg border border-white/40 shadow-glass hidden lg:block"
           />
           <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[20%] right-[5%] w-72 h-40 rounded-3xl bg-white/40 backdrop-blur-lg border border-white/40 shadow-glass hidden lg:block"
           />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">Everything You Need to Vote</h2>
            <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
              We&apos;ve simplified the complexities of the election process into easy-to-follow steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Bot}
              title="AI Assistant"
              description="24/7 personalized chat support to answer your queries about voting rules, eligibility, and ID requirements."
              delay={0.1}
            />
            <FeatureCard 
              icon={MapPin}
              title="Booth Finder"
              description="Instantly locate your designated polling station within your constituency using integrated maps."
              delay={0.2}
            />
            <FeatureCard 
              icon={Calendar}
              title="Election Timeline"
              description="A step-by-step checklist tailored to your registration status, ensuring you're ready for election day."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Trust/Info Section */}
      <section className="py-24 px-6 relative bg-white/30">
        <div className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 bg-gradient-to-br from-indigo-600 to-blue-700 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Designed for Every Voter</h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 font-medium">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  No personal data stored on servers
                </li>
                <li className="flex items-center gap-3 font-medium">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  Multilingual support for all regions
                </li>
                <li className="flex items-center gap-3 font-medium">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  Official ECI rules integrated
                </li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
               <ShieldCheck className="w-12 h-12 mb-6" />
               <p className="text-xl font-medium leading-relaxed italic">
                 &quot;Our mission is to strengthen democracy by making election information accessible, transparent, and easy to understand for every citizen.&quot;
               </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-zinc-200/50 text-center relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">V</div>
            <span className="text-xl font-bold text-slate-800">VoteGuide AI</span>
          </div>
          <p className="text-slate-500 font-medium mb-8">
            Built with ❤️ for Hack2Skill Virtual PromptWars
          </p>
          <div className="flex justify-center gap-8 text-sm font-bold text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">ECI Portal</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
