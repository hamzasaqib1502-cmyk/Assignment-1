import Hero from "./components/Hero";
import About from "./components/About";
import Colors from "./components/Colors";
import OrderForm from "./components/OrderForm";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Colors />
      <section id="order" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-medium tracking-widest uppercase text-neutral-400 mb-4">
                Place Your Order
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Custom Fit
              </h2>
              <p className="text-neutral-500 leading-relaxed">
                Choose your color and enter your measurements. We&apos;ll handle the rest.
              </p>
            </div>
            <OrderForm />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
