"use client";

import Link from "next/link";
import { useUserContext } from "../context/UserContext";
import LanguageSelector from "../components/LanguageSelector";
import { motion } from "framer-motion";
import { ArrowRight, Bot, MapPin, Calendar, CheckCircle2, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="p-10 rounded-[2.5rem] neo-blur bg-white/60 glass-border shadow-neo-glass hover:shadow-indigo-200/50 transition-all group flex flex-col items-center text-center"
  >
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-50 to-blue-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm border border-indigo-100">
      <Icon className="w-8 h-8 text-indigo-600" />
    </div>
    <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{title}</h3>
    <p className="text-slate-600 leading-relaxed font-bold">
      {description}
    </p>
  </motion.div>
);

export default function Home() {
  const { session } = useUserContext();

  return (
    <main className="min-h-screen bg-[#f8fafc] relative overflow-hidden font-sans bg-dot-pattern">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/40 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-200/40 blur-[120px] animate-pulse animation-delay-4000" />
      
      {/* Premium Floating Navigation */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-[100]">
        <div className="neo-blur bg-white/70 glass-border py-4 px-8 rounded-[2rem] flex justify-between items-center shadow-neo-glass">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/30">
              V
            </div>
            <h1 className="text-xl font-black text-slate-800 tracking-tighter">VoteGuide AI</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-8 mr-4">
              <a href="#features" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
              <a href="#about" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">How it Works</a>
            </div>
            <div className="hidden md:block">
              <LanguageSelector />
            </div>
            <Link href={session.isLoggedIn ? "/guide" : "/login"}>
              <Button className="rounded-2xl px-8 h-12 font-bold bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all hover:scale-105 active:scale-95">
                {session.isLoggedIn ? "Dashboard" : "Get Started"}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/50 backdrop-blur-md glass-border text-indigo-700 text-xs font-black tracking-widest uppercase mb-10 shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            Empowering the Indian Voter
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-10 leading-[0.95]"
          >
            Your Vote, <br />
            <span className="text-indigo-600 underline decoration-indigo-200 decoration-8 underline-offset-8">Simplified.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto mb-14 font-bold leading-relaxed"
          >
            Navigate the complexity of the electoral process with a personalized, AI-powered roadmap. Transparent, secure, and built for you.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href={session.isLoggedIn ? "/guide" : "/login"}>
              <Button size="lg" className="h-20 px-12 text-xl font-black rounded-3xl bg-slate-900 hover:bg-indigo-600 shadow-2xl transition-all group">
                {session.isLoggedIn ? "Enter Dashboard" : "Get Your Guide Now"}
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-20 px-12 text-xl font-black rounded-3xl bg-white/50 backdrop-blur-xl border-slate-200 shadow-lg hover:bg-white">
              Watch Demo
            </Button>
          </motion.div>
        </div>

        {/* Floating Interactive Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-[10%] right-[15%] w-48 h-48 border-[20px] border-indigo-100 rounded-full"
            />
            <motion.div 
              animate={{ y: [0, 40, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[10%] left-[10%] w-32 h-32 bg-blue-100/50 rounded-[2rem] rotate-12"
            />
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-6 leading-tight">Civic intelligence, <br />redefined for 2024.</h2>
              <p className="text-xl text-slate-500 font-bold">
                Everything you need to participate in the democratic process, powered by Google Cloud technology.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-indigo-200 flex items-center justify-center text-indigo-300 font-black">01</div>
              <div className="w-12 h-12 rounded-full border-2 border-indigo-600 flex items-center justify-center text-indigo-600 font-black">02</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard 
              icon={Bot}
              title="Gemini AI"
              description="Personalized guidance that understands your constituency, age, and voting requirements."
              delay={0.1}
            />
            <FeatureCard 
              icon={MapPin}
              title="Booth Map"
              description="Real-time polling booth discovery using Google Maps, tailored to your exact district."
              delay={0.2}
            />
            <FeatureCard 
              icon={Calendar}
              title="Live Tracker"
              description="Never miss a deadline. Automatic registration reminders and election day countdowns."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Unique Trust Island */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
           <div className="neo-blur bg-slate-900/95 rounded-[4rem] p-16 md:p-24 text-white relative overflow-hidden shadow-neo-glass">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/20 blur-[150px] -mr-96 -mt-96" />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div>
                  <h2 className="text-5xl font-black mb-8 tracking-tighter leading-tight">Privacy by Design. <br />Trust by Default.</h2>
                  <div className="space-y-6">
                    {[
                      { icon: ShieldCheck, text: "Zero Server-Side Storage of PII" },
                      { icon: Sparkles, text: "Real-time Google Translation support" },
                      { icon: Zap, text: "Official ECI Verified Content" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <item.icon className="w-8 h-8 text-indigo-400" />
                        <span className="text-xl font-bold">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-[3rem] bg-indigo-600/20 border border-white/20 flex flex-col items-center justify-center p-12 text-center group">
                    <Bot className="w-24 h-24 mb-10 text-indigo-400 group-hover:scale-110 transition-transform duration-500" />
                    <p className="text-2xl font-bold leading-relaxed italic">
                      &quot;Our mission is to strengthen democracy by making election information accessible, transparent, and easy to understand for every citizen.&quot;
                    </p>
                    <div className="mt-10 h-1 w-20 bg-indigo-500 rounded-full" />
                  </div>
                </div>
              </div>
           </div>
        </div>
      </section>

      <footer className="py-24 border-t border-zinc-200/50 text-center relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-6 mb-12">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-indigo-500/20">V</div>
            <span className="text-3xl font-black text-slate-900 tracking-tighter">VoteGuide AI</span>
          </div>
          <p className="text-slate-500 font-bold mb-12 text-lg">
            Built with ❤️ for the world&apos;s largest democracy.
          </p>
          <div className="flex flex-wrap justify-center gap-10 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-indigo-600 transition-colors">ECI Portal</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Security</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Multilingual</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
