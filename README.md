# VoteGuide AI — Empowering Every Indian Voter

VoteGuide AI is a premium, context-aware digital assistant designed to simplify the Indian electoral process. Whether you're a first-time voter or a seasoned citizen, VoteGuide AI provides a personalized roadmap from registration to the polling booth.

Built for the **Hack2Skill Virtual PromptWars Challenge 2**.

## 🚀 The Mission
Voting in the world's largest democracy should be accessible, transparent, and simple. VoteGuide AI solves the information gap by providing a high-fidelity, interactive platform that guides users based on their specific eligibility, location, and registration status.

---

## ✨ Key Features

### 🧠 Personalized AI Assistant
- Powered by **Gemini 2.5 Flash**, our AI assistant understands your specific context (Age, State, District).
- **Markdown Formatting:** Support for bold text, lists, and headings for professional information architecture.
- **Dynamic Translation:** Real-time API translation of AI responses into your preferred language.

### 🗺️ Context-Aware Dashboard
- **Election Roadmap:** A visual progress tracker tailored to your status (Eligible, Registered, or Ready to Vote).
- **Find My Booth:** Integrated Google Maps view focused on polling stations in your district.
- **EVM & VVPAT Explainer:** A stunning visual walkthrough of the voting process and verification slips.

### 🔒 Persistent Experience
- **Secure Profile Setup:** Configure your voting profile once; our system remembers your session via localized persistence.
- **Dynamic Routing:** The dashboard automatically adapts its tools and guidance based on your profile changes.

---

## 🛠️ Comprehensive Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Core Framework** | [Next.js 14](https://nextjs.org/) | App Router for modern server-side rendering and routing. |
| **Language** | [JavaScript / React 18](https://reactjs.org/) | Dynamic component-based architecture. |
| **AI Engine** | [Google Generative AI](https://ai.google.dev/) | Leveraging Gemini 2.5 Flash for natural language processing. |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS for rapid, modern design implementation. |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Powering premium micro-animations and smooth transitions. |
| **Persistence** | [LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) | Ensuring session-awareness and user profile retention. |
| **Components** | [Radix UI / Shadcn](https://ui.shadcn.com/) | Accessible, high-quality primitive components. |

---

## 🌐 Google Tools & Services Integration

The platform leverages the power of Google Cloud to provide a seamless, high-utility experience:

### 1. Google Gemini API (`@google/generative-ai`)
- **Model:** `gemini-2.5-flash`
- **Role:** Acts as the brain of the platform. It processes the user's demographic context (age, location) to provide legally accurate and empathetic guidance on ECI rules.
- **Integration:** Custom system prompts and real-time chat history management.

### 2. Google Maps JavaScript API
- **Role:** Powers the "Find My Booth" section.
- **Features:** Dynamic map rendering, custom markers for polling stations, and district-based filtering using the Google Places library.

### 3. Cloud Translation API (v2)
- **Role:** Handles dynamic content translation for the AI assistant.
- **Benefit:** Ensures that even complex AI-generated guidance is readable in Hindi, Telugu, or English without losing nuance.

### 4. Google Translate Widget
- **Role:** Provides instant, full-page UI transformation.
- **Benefit:** Allows the entire dashboard interface to be translated at the browser level for immediate accessibility.

### 5. Google Calendar API (v3)
- **Role:** Enables "Add Reminders" functionality.
- **Integration:** Allows users to sync important election dates and registration deadlines directly to their personal Google Calendar via OAuth or .ics export.

---

## 🎨 Design Philosophy
The application utilizes a **"GovTech Glassmorphism"** aesthetic:
- **Visual Excellence:** High-fidelity layouts with backdrop blurs, vibrant indigo gradients, and shadow-rich elevations.
- **Typography:** Uses **Inter** and **Outfit** for a clean, professional, and accessible feel.

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v20+)
- npm or pnpm

### Installation
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
3. Add the following keys to `.env.local`:
   - `GEMINI_API_KEY`
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
   - `GOOGLE_TRANSLATE_API_KEY`
   - `NEXT_PUBLIC_GOOGLE_CALENDAR_CLIENT_ID`

### Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to start your voting journey.

---
**VoteGuide AI** — Your personalized guide to the world's largest democracy.
