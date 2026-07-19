import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <p className="text-sm font-medium tracking-widest uppercase text-neutral-400">
                New Collection 2026
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.95]">
                Premium
                <br />
                <span className="font-light">Baggy</span>
                <br />
                Denim
              </h1>
              <p className="text-lg text-neutral-500 max-w-md mx-auto lg:mx-0 leading-relaxed">
                Crafted from the finest denim. Designed for comfort. Built for
                the streets.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#colors"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-black text-white font-medium hover:bg-neutral-800 transition-all duration-200 hover:scale-105 active:scale-95 text-sm"
              >
                Shop Now
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-neutral-300 text-black font-medium hover:border-black transition-all duration-200 text-sm"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden">
              <Image
                src="https://esskateboarding.com/cdn/shop/files/5130002112-450-F-002.webp?v=1770877801&width=1946"
                alt="Premium baggy denim jeans"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg px-6 py-4 hidden lg:block">
              <p className="text-xs text-neutral-400 uppercase tracking-wider">
                Starting from
              </p>
              <p className="text-2xl font-bold">$49.99</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
