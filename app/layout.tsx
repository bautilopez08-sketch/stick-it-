import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import "@/app/globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { AppStateProvider } from "@/context/app-state";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "Stick-it | Stickers personalizados",
  description: "Diseñá stickers únicos, subí tu imagen, personalizala y comprá en minutos con Stick-it."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${manrope.variable} ${spaceGrotesk.variable}`}>
        <AppStateProvider>
          <div className="relative flex min-h-screen flex-col overflow-hidden">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AppStateProvider>
      </body>
    </html>
  );
}
