# VoteGuide AI — Context-Aware Election Process Assistant

VoteGuide AI is an interactive, AI-powered election education assistant tailored for the Indian voting system. 
Built for the **Hack2Skill Virtual PromptWars Challenge 2**.

## 1. Chosen Vertical
**Election Process Education**

## 2. Approach and Logic
The system uses a contextual decision engine that takes user input (Age, Location, Registration Status) and dynamically routes them to the appropriate journey:
- **Age < 18:** Not eligible yet; shows educational content.
- **Age >= 18 & Not Registered:** Focuses heavily on registration deadlines, Form 6 instructions, and required documents.
- **Age >= 18 & Registered:** Focuses on polling day activities, identifying polling booths, and setting calendar reminders.

This state is persisted locally using React Context, and forms the system prompt context for the AI assistant.

## 3. How the Solution Works
1. **Onboarding:** The user enters age, state, district, and registration status. No PII (names, emails) is collected.
2. **Dynamic Dashboard:** Based on the input, the user lands on a customized guide page featuring:
   - **Election Timeline:** A visual step-by-step progress tracker.
   - **Chat Assistant:** An AI agent powered by Google Gemini that answers election-related questions with context.
   - **Polling Booth Map:** An integrated Google Map showing polling locations in the user's district.
   - **EVM Explainer:** A visual guide built entirely with SVG and CSS to explain voting machines and VVPAT.
   - **Calendar Reminders:** Quick ICS downloads or OAuth integration for election reminders.
   - **Multilingual Support:** Dynamic language switching using Google Translate API.

## 4. Assumptions Made
- Users have active internet access to use the AI and Maps features.
- User location inputs are generally accurate (no strict GPS verification to prioritize privacy).
- The election process data and required documents are based on standard Election Commission of India (ECI) rules.

## 5. Google Services Used
The application integrates four core Google APIs. To enable them, obtain the keys and add them to `.env.local` (see `.env.example`).

* **Google Gemini API (@google/generative-ai):** Powers the ChatAssistant. Get your key from [Google AI Studio](https://aistudio.google.com/).
* **Google Maps JavaScript API:** Powers the PollingBoothMap using the Places library. Enable "Maps JavaScript API" and "Places API" in [Google Cloud Console](https://console.cloud.google.com/).
* **Google Calendar API v3:** Powers the AddReminderButton. Enable "Google Calendar API" in Google Cloud Console and generate an OAuth 2.0 Client ID.
* **Google Translate API v2:** Powers the LanguageSelector. Enable "Cloud Translation API" in Google Cloud Console.

## 6. How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup Instructions
1. Clone this repository and navigate to the project folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment variables example file:
   ```bash
   cp .env.example .env.local
   ```
4. Add your API keys to `.env.local`.
5. Start the Next.js development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests
To run the Jest unit and component tests:
```bash
npm run test
```
