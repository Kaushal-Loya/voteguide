# VoteGuide AI — Empowering Every Indian Voter

VoteGuide AI is a premium, context-aware digital assistant designed to simplify the Indian electoral process. Whether you're a first-time voter or a seasoned citizen, VoteGuide AI provides a personalized roadmap from registration to the polling booth.

Built for the **Hack2Skill Virtual PromptWars Challenge 2**.

---

## 🏛️ Project Details

### 1. Chosen Vertical
**Election Process Education**

### 2. Approach and Logic
The platform utilizes a **Contextual Decision Engine** that analyzes user demographics (age, location, registration status) to dynamically tailor the entire experience. 
- **User-Centric States:** Instead of a generic guide, the app maintains distinct states for "Ineligible (Under 18)", "Eligible but Unregistered", and "Ready to Vote".
- **Dynamic Context Injection:** The user's specific profile is injected into the AI's system instructions, ensuring that every piece of advice is legally and geographically accurate to the user's district.
- **Persistence First:** We prioritize a "login-less" but persistent experience by synchronizing the user's profile with localized storage, ensuring they can resume their voting journey at any time.

### 🧠 The Adaptive Context Engine
VoteGuide AI isn't just a website; it's a dynamic guide that reacts to who you are.
- **Active Context Card**: The dashboard features an "Active Context" indicator that shows your current AI-assigned persona (e.g., "Journey: Polling Day Logistics").
- **Dynamic Content Shifting**: 
    - **AI Assistant**: The Gemini API receives your background profile, allowing it to provide personalized registration steps or booth requirements.
    - **UI Adaptation**: Sections like "Find Booth" are automatically hidden or unlocked based on your eligibility and registration status.
    - **Localized Roadmaps**: Timeline events change priority based on your specific district and registration phase.

### 3. How the Solution Works
1. **Intelligent Onboarding:** Users configure their voting profile (Age, State, District). This data is stored locally to maintain privacy while enabling personalization.
2. **Dashboard Generation:** Based on the profile, the dashboard activates specific modules:
   - **Timeline:** A step-by-step progress tracker for their specific voting stage.
   - **AI Assistant:** A Gemini-powered chat interface that answers questions with full awareness of the user's location and eligibility.
   - **Booth Discovery:** Real-time mapping of polling stations using the Google Maps API.
3. **Information Accessibility:** Users can toggle languages (English, Hindi, Telugu) instantly, with both the UI and AI responses translating in real-time.
4. **Actionable Alerts:** Users can add important dates to their personal Google Calendar to ensure they never miss a registration deadline or polling day.

### 4. Assumptions Made
- **Data Source:** All election rules and document requirements are assumed to be based on the latest standard Election Commission of India (ECI) guidelines.
- **Connectivity:** The application assumes an active internet connection for real-time AI processing and Google Maps rendering.
- **User Location:** It is assumed that users select their district and state accurately, as the app prioritizes privacy by not forcing GPS-based tracking.
- **Voter ID:** Guidance for registered voters assumes they possess or are in the process of acquiring an EPIC (Voter ID) card.

---

## 🛠️ Comprehensive Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Core Framework** | Next.js 14 | App Router for modern server-side rendering and routing. |
| **AI Engine** | Google Gemini API | Leveraging **Gemini 2.5 Flash** for high-speed, accurate NLP. |
| **Styling** | Tailwind CSS | Utility-first CSS for a premium "GovTech Glassmorphism" design. |
| **Animations** | Framer Motion | Powering premium micro-animations and smooth transitions. |
| **Persistence** | LocalStorage API | Ensuring session-awareness and user profile retention. |
| **Notifications** | Sonner | Premium, animated toast notifications for system feedback. |
| **Components** | Radix UI / Shadcn | Accessible, high-quality primitive components. |

---

## 🌐 Google Tools & Services Integration

1. **Google Gemini API**: Powers the AI Assistant. It processes demographic context to provide empathetic and legally accurate guidance.
2. **Google Maps JavaScript API**: Powers the "Find My Booth" section with dynamic markers and district-based filtering.
3. **Cloud Translation API (v2)**: Handles dynamic content translation for the AI assistant's responses.
4. **Google Translate Widget**: Provides instant, full-page UI transformation for immediate accessibility.
5. **Google Calendar API (v3)**: Enables "Add Reminders" functionality, syncing important dates directly to the user's Google Calendar.

---

## ⚙️ Setup & Installation

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
3. Add your API keys to `.env.local` (`GEMINI_API_KEY`, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`, etc.).
4. Run locally:
   ```bash
   npm run dev
   ```

---
**VoteGuide AI** — Your personalized guide to the world's largest democracy.
