import Onboarding from "../components/Onboarding";
import LanguageSelector from "../components/LanguageSelector";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 flex flex-col">
      <header className="w-full bg-white border-b border-zinc-200 py-4 px-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">V</div>
          <h1 className="text-xl font-bold text-zinc-900">VoteGuide AI</h1>
        </div>
        <LanguageSelector />
      </header>
      
      <div className="flex-1">
        <Onboarding />
      </div>

      <footer className="w-full py-6 text-center text-zinc-500 text-sm border-t border-zinc-200 bg-white">
        Built for Hack2Skill Virtual PromptWars
      </footer>
    </main>
  );
}
