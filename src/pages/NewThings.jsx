export default function NewThings() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-50 via-white to-green-100">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-400/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-400/20 blur-[120px] rounded-full" />

      <div className="container mx-auto px-4 py-28 text-center relative z-10">

        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-2 mb-8 rounded-full bg-white/80 backdrop-blur-md border border-green-200 text-green-700 font-bold text-sm shadow-lg">
          🚚 Free Delivery on Orders Over ₹499
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-7xl font-black leading-tight mb-6 tracking-tight text-gray-900">
          <span className="text-green-600">Fresh Groceries</span>
          <br />
          Delivered to Your Doorstep
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl mx-auto text-gray-600 text-lg md:text-xl mb-12">
          Shop from <b>fresh fruits, vegetables, dairy, spices & daily essentials</b>.  
          <span className="text-green-600 font-semibold">
            {" "}Fast delivery • Best prices • Trusted quality
          </span>
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <button onClick={"/products"} className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-green-600 text-white font-bold text-lg shadow-[0_20px_50px_rgba(34,197,94,0.4)] hover:bg-green-700 transition-all hover:scale-105">
            🛒 Start Shopping
            <span className="text-xl">→</span>
          </button>

          <button onClick={"/categories"} className="px-10 py-4 rounded-full bg-white border border-green-300 text-green-700 font-bold text-lg hover:bg-green-100 transition-all hover:scale-105 shadow-md">
            Browse Categories
          </button>
        </div>

        {/* Trust Badges */}
        {/* <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm font-semibold text-gray-500">
          <div className="flex items-center gap-2">🥬 Fresh & Organic</div>
          <div className="flex items-center gap-2">⚡ 30 Min Delivery</div>
          <div className="flex items-center gap-2">💳 Secure Payments</div>
          <div className="flex items-center gap-2">⭐ 10K+ Happy Customers</div>
        </div> */}
      </div>

      {/* Soft radial background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.12),_transparent_65%)]" />
    </section>
  );
}
