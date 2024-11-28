import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/footer";
import Header from "./components/header";

export const metadata: Metadata = {
  title: "زبانشناسی",
  description: "پروژه زبانشناسی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-gray-800 h-screen antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}