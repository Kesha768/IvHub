import type { Metadata } from "next";
import { Inter, Unbounded, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "IVHub",
  description: "IVHub by weks (tg @CeoWEKS)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.variable} ${unbounded.variable} ${montserrat.variable} antialiased overflow-x-hidden`}
      >
        <div className="px-2.5 sm:px-6 md:px-8  mx-auto w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
