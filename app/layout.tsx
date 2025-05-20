import type { Metadata } from "next";
import "./globals.css";
import Navbar from './components/navbar'


export const metadata: Metadata = {
  title: "FrameIQ",
  description: "Guess the movie from a single frame. Challenge your memory, test your movie knowledge!"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <Navbar/>
        {children}
      </body>
    </html>
  );
}
