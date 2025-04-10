import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { Geist, Geist_Mono } from "next/font/google";
import { Notifications } from "@mantine/notifications";
import { ChatBotWidget } from "@/components/molecules/chatbot-widget";
import type { Metadata } from "next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InterOpera Dashboard",
  description: "Coding test by InterOpera Company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      {...mantineHtmlProps}
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`antialiased`}>
        <MantineProvider
          theme={{
            fontFamily: "var(--font-geist-sans)",
            fontFamilyMonospace: "var(--font-geist-mono)",
            headings: { fontFamily: "var(--font-geist-sans)" },
          }}
        >
          <Notifications position="top-center" />
          <ChatBotWidget />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
