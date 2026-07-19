import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "DENIM CO. | Premium Baggy Denim Jeans",
  description:
    "Premium baggy denim jeans crafted for comfort, style, and streetwear culture. Shop our curated collection of oversized fits.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white text-neutral-900`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
