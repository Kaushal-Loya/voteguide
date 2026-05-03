import { Inter } from "next/font/google";
import "../styles/globals.css";
import { UserProvider } from "../context/UserContext";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VoteGuide AI | Context-Aware Election Assistant",
  description: "A personalized, context-aware AI election education assistant for Indian voters.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-zinc-50 text-zinc-900`} suppressHydrationWarning>
        <UserProvider>
          <div id="google_translate_element" style={{ display: 'none' }}></div>
          <Script id="google-translate-init" strategy="afterInteractive">
            {`
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'en,hi,te',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: false
                }, 'google_translate_element');
              }
            `}
          </Script>
          <Script 
            src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
            strategy="afterInteractive"
          />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
