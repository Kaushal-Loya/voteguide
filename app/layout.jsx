import { Inter } from "next/font/google";
import "../styles/globals.css";
import { UserProvider } from "../context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VoteGuide AI | Context-Aware Election Assistant",
  description: "A personalized, context-aware AI election education assistant for Indian voters.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-zinc-50 text-zinc-900`}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
