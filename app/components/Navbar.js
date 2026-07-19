"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Colors", href: "#colors" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#hero" className="text-xl lg:text-2xl font-bold tracking-tight">
            DENIM<span className="font-light"> CO.</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-600 hover:text-black transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#order"
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-black text-white text-sm font-medium hover:bg-neutral-800 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Order Form
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-64 border-t border-neutral-100" : "max-h-0"
        }`}
      >
        <div className="px-6 py-4 space-y-3 bg-white">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-neutral-600 hover:text-black transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#order"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-black text-white text-sm font-medium hover:bg-neutral-800 transition-all duration-200"
          >
            Order Form
          </a>
        </div>
      </div>
    </nav>
  );
}
