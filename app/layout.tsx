import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";
import { TrialProvider } from "@/providers/TrialProvider";
import Navbar from "@/components/Navbar";
import TrialUpgradePrompt from "@/components/TrialUpgradePrompt";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BoomNut - Ace Your Exams with AI",
  description: "Smart AI study buddy with flashcards, quizzes, and personalized tutoring",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <TrialProvider>
            <Navbar />
            {children}
            <TrialUpgradePrompt />
          </TrialProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
