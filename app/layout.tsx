// layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { Inter, JetBrains_Mono } from "next/font/google";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Immovision",
  description: "Plateforme de gestion immobilière",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="relative flex flex-col min-h-screen font-sans bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white overflow-x-hidden">

        {/* Background animation */}
        <div className="absolute inset-0 z-0 animate-pulse bg-gradient-to-br from-blue-800/50 via-purple-800/50 to-black/70 blur-3xl" />

        <header className="z-10 bg-opacity-30 backdrop-blur-sm shadow-lg px-6 py-4 border-b border-white/10">
          <div className="flex justify-between items-center">
            <a href="/" className="text-2xl font-bold tracking-tight text-white hover:opacity-80 transition">
              Immovision
            </a>

            <div className="flex items-center gap-4">
              {/* Logo */}
              <Image
                src="/logo.png"
                alt="Logo Immovision"
                width={48}
                height={48}
                className="rounded-full"
              />

              {/* Boutons d'action */}
              <div className="hidden sm:flex gap-3">
                <a
                  href="/login"
                  className="bg-white text-black px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition"
                >
                  🔐 Se connecter
                </a>
                <a
                  href="/register"
                  className="border border-white/40 px-4 py-2 rounded-full text-sm hover:bg-white/10 transition"
                >
                  ✍️ Créer un compte
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="z-10 flex-1 p-6 md:p-12">{children}</main>

        {/* Footer */}
        <footer className="z-10 bg-opacity-30 backdrop-blur-sm border-t border-white/10 text-center py-4 flex flex-col md:flex-row items-center justify-center gap-4">
  <a href="/cgu" className="hover:underline text-sm text-white/80">
    © 2025 - Tous droits réservés
  </a>
  <a
    href="/contact"
    className="bg-white text-black px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition"
  >
    ✉️ Nous contacter
  </a>
</footer>
      </body>
    </html>
  );
}
