"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import OrderForm from "./OrderForm";

const colors = [
  {
    name: "Black",
    description: "Timeless and versatile. The black wash pairs with everything in your wardrobe.",
    image: "/blac.png",
  },
  {
    name: "Light Blue",
    description: "Classic light wash denim. A fresh, casual look perfect for everyday wear.",
    image: "/lblue.png",
  },
  {
    name: "Dark Blue",
    description: "Rich indigo tone. Clean and refined for a polished streetwear aesthetic.",
    image: "/dblue.png",
  },
  {
    name: "Mustard",
    description: "Bold and expressive. Stand out from the crowd with this statement color.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqh_AedARD9EyVhUz-PIpG61TLYHPFvEzKUxHmaT6rcUfjuHsyi9VZwMLV&s=10",
  },
];

export default function Colors() {
  const [selectedColor, setSelectedColor] = useState(null);
  const [originRect, setOriginRect] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cardRefs = useRef({});

  const handleCardClick = useCallback((color) => {
    const el = cardRefs.current[color.name];
    if (el) {
      const rect = el.getBoundingClientRect();
      setOriginRect({ x: rect.left, y: rect.top, w: rect.width, h: rect.height });
    }
    setSelectedColor(color);
    setClosing(false);
    setAnimating(true);
    setShowContent(false);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (animating) {
      const t1 = requestAnimationFrame(() => {
        setOriginRect(null);
        const t2 = setTimeout(() => {
          setShowContent(true);
          setAnimating(false);
        }, 400);
        return () => clearTimeout(t2);
      });
      return () => cancelAnimationFrame(t1);
    }
  }, [animating]);

  const handleClose = useCallback(() => {
    setShowContent(false);
    setClosing(true);
    setOriginRect(null);
    setTimeout(() => {
      setSelectedColor(null);
      setClosing(false);
      setMounted(false);
    }, 350);
  }, []);

  useEffect(() => {
    if (selectedColor && !closing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedColor, closing]);

  const backdropClass = closing
    ? "animate-fade-out"
    : "animate-fade-in";

  const panelClass = closing
    ? "opacity-0 scale-95"
    : "opacity-100 scale-100";

  const imageStyle = closing
    ? { width: "35%", height: "100%", opacity: 0 }
    : originRect
      ? { width: originRect.w, height: "100%", opacity: 0.9 }
      : { width: "50%", height: "100%", opacity: 1 };

  return (
    <section id="colors" className="py-10 sm:py-24 lg:py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <p className="text-sm font-medium tracking-widest uppercase text-neutral-400 mb-4">
            Available Colors
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Find Your Shade
          </h2>
          <p className="text-neutral-500 text-lg leading-relaxed">
            Four carefully curated colors to match every mood and style.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {colors.map((color) => (
            <div
              key={color.name}
              ref={(el) => { cardRefs.current[color.name] = el; }}
              onClick={() => handleCardClick(color)}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={color.image}
                  alt={`${color.name} baggy denim jeans`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/90 text-xs font-semibold uppercase tracking-wider text-black">
                    {color.name}
                  </span>
                </div>
              </div>
              <div className="p-3 lg:p-6">
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-0.5 lg:mb-2">{color.name}</h3>
                <p className="text-neutral-500 text-[10px] lg:text-sm leading-relaxed line-clamp-2">
                  {color.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {mounted && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={handleClose}
        >
          <div className={`absolute inset-0 bg-black/50 ${backdropClass}`} />

          <div
            className={`relative z-10 w-[90vw] max-w-5xl h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex transition-all duration-350 ease-out ${panelClass}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-neutral-800 transition-colors duration-200"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-full h-full flex flex-col md:flex-row">
              <div
                className="relative flex-shrink-0 transition-all duration-500 ease-out overflow-hidden hidden md:block"
                style={imageStyle}
              >
                <Image
                  src={selectedColor.image}
                  alt={`${selectedColor.name} baggy denim jeans`}
                  fill
                  className="object-cover"
                />
              </div>

              <div
                className={`flex-1 overflow-y-auto p-8 md:p-10 transition-all duration-500 ease-out ${
                  showContent && !closing ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
              >
                <p className="text-sm font-medium tracking-widest uppercase text-neutral-400 mb-2">
                  {selectedColor.name}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                  {selectedColor.name} Baggy Jeans
                </h3>
                <p className="text-neutral-500 leading-relaxed mb-8">
                  {selectedColor.description}
                </p>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
                    Order This Color
                  </p>
                  <OrderForm initialColor={selectedColor.name} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
