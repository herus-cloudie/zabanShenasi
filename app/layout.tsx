import type { Metadata } from "next";
import "./globals.css";


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
        {children}
      </body>
    </html>
  );
}